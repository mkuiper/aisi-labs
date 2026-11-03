import concurrent.futures
import http.client
import json
from pathlib import Path
import stat
import tempfile
import threading
import unittest
from unittest.mock import patch
import uuid

from feedback import FeedbackStore
from server import make_server


def comment(message="Fictional practice feedback: clearer instructions would help."):
    return {"submission_id": str(uuid.uuid4()), "category": "suggestion", "message": message}


class FeedbackTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.store = FeedbackStore(self.temp.name)

    def test_save_retry_restart_and_email_report(self):
        item = comment("Fake <script> text & a suggestion.\nKeep the offline example.")
        result = self.store.submit(item)
        self.assertEqual(result, self.store.submit(item))
        paths = list(self.store.path.glob("*.json"))
        self.assertEqual(len(paths), 1)
        self.assertEqual(stat.S_IMODE(paths[0].stat().st_mode), 0o600)
        record = json.loads(paths[0].read_text())
        self.assertEqual(set(record), {"submission_id", "category", "message", "created"})
        review = FeedbackStore(self.temp.name).review()
        self.assertEqual(review["count"], 1)
        self.assertIn(item["message"], review["report"])
        self.assertIn("NOT SENT", review["report"])
        with self.assertRaises(ValueError):
            self.store.submit({**item, "message": "Different fake comment"})
        self.assertIn(item["message"], self.store.review()["report"])

    def test_validation_and_capacity(self):
        for payload in [None, {}, {**comment(), "name": "Fake"}, {**comment(), "category": []}, {**comment(), "submission_id": "../outside"}, comment(""), comment("x" * 2001), comment("\ud800"), comment("\x00")]:
            with self.subTest(payload=repr(payload)), self.assertRaises(ValueError):
                self.store.submit(payload)
        with patch("feedback.MAX_ENTRIES", 1):
            self.store.submit(comment())
            with self.assertRaisesRegex(ValueError, "full"):
                self.store.submit(comment())
        self.assertEqual(self.store.review()["count"], 1)

    def test_concurrency_corrupt_and_symlink_preservation(self):
        items = [comment("Fake comment " + str(index)) for index in range(12)]
        with concurrent.futures.ThreadPoolExecutor() as pool:
            list(pool.map(self.store.submit, items))
        directory = self.store.path
        damaged = directory / (str(uuid.uuid4()) + ".json")
        damaged.write_text("broken fixture")
        outside = Path(self.temp.name) / "outside.json"
        outside.write_text("untouched fixture")
        linked = directory / (str(uuid.uuid4()) + ".json")
        linked.symlink_to(outside)
        result = self.store.review()
        self.assertEqual(result["count"], 12)
        self.assertEqual(len(result["warnings"]), 2)
        self.assertEqual(damaged.read_text(), "broken fixture")
        self.assertEqual(outside.read_text(), "untouched fixture")
        with self.assertRaises(ValueError):
            self.store.submit({**comment(), "submission_id": linked.stem})

    def test_directory_link_and_failed_write_do_not_report_success(self):
        outside = Path(self.temp.name) / "outside"
        outside.mkdir()
        self.store.path.symlink_to(outside, target_is_directory=True)
        with self.assertRaises(ValueError):
            self.store.submit(comment())
        self.store.path.unlink()
        with patch("feedback.atomic_json", side_effect=OSError("Fake disk failure")), self.assertRaises(OSError):
            self.store.submit(comment())
        self.assertEqual(self.store.review()["count"], 0)


class FeedbackHttpTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.server = make_server(0, self.temp.name)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.addCleanup(self.close)

    def close(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.temp.cleanup()

    def request(self, path, payload=None, authenticated=True, method="POST", extra_headers=None):
        connection = http.client.HTTPConnection("127.0.0.1", self.server.server_port)
        headers = {"Content-Type": "application/json"}
        if authenticated:
            headers.update({"Origin": f"http://127.0.0.1:{self.server.server_port}", "X-Labs-Token": self.server.hub.token})
        headers.update(extra_headers or {})
        connection.request(method, path, None if payload is None else json.dumps(payload), headers)
        response = connection.getresponse()
        value = response.read()
        connection.close()
        return response.status, json.loads(value)

    def test_feedback_before_acknowledgement_and_explicit_review(self):
        item = comment()
        self.assertEqual(self.request("/api/feedback", item, False)[0], 403)
        self.assertEqual(self.request("/api/feedback/review", {}, False)[0], 403)
        self.assertEqual(self.request("/api/feedback", item, extra_headers={"Origin": "https://fake.invalid"})[0], 403)
        self.assertEqual(self.request("/api/feedback/review", {}, extra_headers={"X-Labs-Token": "FAKE-invalid-token"})[0], 403)
        self.assertEqual(self.request("/api/feedback", item)[0], 200)
        code, bootstrap = self.request("/api/bootstrap", method="GET")
        self.assertEqual(code, 200)
        self.assertNotIn(item["message"], json.dumps(bootstrap))
        self.assertIn("suggestion", bootstrap["feedback_options"]["categories"])
        self.assertEqual(self.request("/api/feedback/review", {})[1]["count"], 1)
        self.assertEqual(self.request("/api/feedback/review", {"project": "fake"})[0], 400)
        self.assertEqual(self.request("/api/feedback/review", method="GET")[0], 404)
        for message in ["\ud800", "\x00", "x" * 2001]:
            self.assertEqual(self.request("/api/feedback", comment(message))[0], 400)

#!/usr/bin/env python3
"""Run one explicitly authorised November 2026 review round (no installs)."""

import argparse
from datetime import datetime
import fcntl
import os
from pathlib import Path
import subprocess
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
ZONE = ZoneInfo("Australia/Canberra")
START = datetime(2026, 11, 27, 19, 30, tzinfo=ZONE)
FINISH = datetime(2026, 11, 30, 9, tzinfo=ZONE)
LOG = "docs/WEEKEND_REVIEW_2026-11-27.md"
PROMPT = f"""The owner authorises one paced weekend review of this repository.
Read AGENTS.md, ARCHITECTURE.md, docs/PROGRAMME.md, docs/REVIEW.md,
docs/CONTENT_MAINTENANCE.md, skills/aisi-learning-review/SKILL.md and {LOG}.
Do ONE unfinished queue item, with at most one focused instructional improvement.
After 2026-11-30 08:00 Australia/Canberra, write only the final handover.
Mark completed queue items and append evidence, sources, checks and limits to
the log so the next round can continue without rereading old transcripts.
Keep modules professional and factual. Fun motion must teach, respect reduced
motion and offer appropriate controls. Disclose destinations before fetching
primary sources. Never refresh review metadata without actual source/exercise
inspection. Preserve public-only, NO OFFICIAL and NEVER government-network or
account boundaries. No installs, upgrades, paid calls, image generation,
deployment, account connections, learner credentials or learner data inspection.
The scheduled Codex review itself is authorised; do not call other models/tools
as a teaching exercise. No subagents. Do not change this runner or its schedule.
Use apply_patch. Stop if unrelated edits appear. Never reset, stash, force-push,
rewrite history, change remotes or weaken tests. Run unit/HTTP tests and JS checks;
run isolated browser smoke for lesson/UI changes and inspect affected layouts.
Update required changelogs/docs for material changes. Inspect staged changes,
commit checked work and push to existing origin main. If push fails, keep the
commit and report failure; never claim success. End after this chunk. Do not
sleep, loop for another round or create more schedules. If all items are done,
report that and finish. Stop work by 09:00 Monday Canberra.
"""


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    now = datetime.now(ZONE)
    if args.dry_run:
        print(f"Checkout: {ROOT}\nWindow: {START.isoformat()} to {FINISH.isoformat()}")
        print(PROMPT)
        return
    if not START <= now < FINISH:
        print("Outside authorised review window; no Codex invocation.", flush=True)
        return
    runtime = Path(os.environ["XDG_RUNTIME_DIR"])
    with (runtime / "aisi-weekend-review-20261127.lock").open("w") as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            print("Review already running; skipped.", flush=True)
            return
        status = subprocess.check_output(
            ["git", "status", "--porcelain"], cwd=ROOT, text=True
        )
        branch = subprocess.check_output(
            ["git", "branch", "--show-current"], cwd=ROOT, text=True
        ).strip()
        if status or branch != "main":
            print("Checkout is dirty or not main; skipped without changes.", flush=True)
            return
        binary = Path(os.environ["AISI_REVIEW_CODEX_BIN"])
        if not binary.is_file() or not os.access(binary, os.X_OK):
            raise SystemExit("Pinned Codex binary unavailable; no wrapper/install attempted.")
        # Match this explicitly authorised local editing session. No bypass or
        # trust-persistence flags; use the owner's existing configured account.
        command = [str(binary), "--search", "-a", "never", "exec",
                   "--sandbox", "danger-full-access", "--ephemeral",
                   "--color", "never", "-C", str(ROOT), "-"]
        seconds = min(5400, max(1, int((FINISH - now).total_seconds())))
        print(f"Starting bounded review at {now.isoformat()}", flush=True)
        try:
            result = subprocess.run(command, input=PROMPT, text=True, cwd=ROOT,
                                    timeout=seconds, check=False)
        except subprocess.TimeoutExpired:
            raise SystemExit("Review timed out; preserve checkout for inspection.")
        raise SystemExit(result.returncode)


if __name__ == "__main__":
    main()

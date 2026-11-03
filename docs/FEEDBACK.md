# Collect and share learner feedback

4 November 2026. Feedback is optional and local to each laptop. The app does
not send email, connect an account or collect usage analytics.

## Learner flow

Open Give feedback in the footer or Finish session. Choose a feedback type,
describe the part of Labs and the change you suggest, then check the public-only
confirmation and save. Comments are limited to 2000 characters and 6000 UTF-8
bytes. A draft survives navigation in its browser tab but is lost on reload.
Successful saving displays a receipt and clears the draft. Failure keeps it
available for retry. Start a new comment clears the current draft.

Do not include names, contact details, API keys, OFFICIAL information or other
non-public material. The app attaches no project, current page, activity history,
device details or screenshots. People sharing the Linux account can read saved
comments; the collection is not a private or anonymous reporting system.

## Facilitator flow

1. Open Give feedback and choose Review saved feedback. Entries are loaded only
   on this explicit action, not when a learner opens the app.
2. Inspect the compiled report. Ask the deployment owner about any non-public
   material accidentally included; do not send it to developers.
3. Copy or download the plain-text report. A manual selection-and-copy fallback
   remains available when clipboard access fails.
4. Use the agreed developer email address and permitted learning account to send
   the reviewed report. NEVER use government networks or accounts from this
   laptop. The app does not choose a recipient, open an email client or verify
   delivery. A download or copy confirmation means the report was prepared only.

Exporting does not remove records. Reports include each receipt so developers
can identify repeated submissions in reports. Facilitators must agree a review
cadence and retention/archive process with the deployment owner before a pilot.
There is no automated deletion. Shared-account review is not restricted to a
facilitator by authentication, so the UI makes that limit explicit.

## Storage and design choices

Each submission is a separate mode-0600 JSON file under the existing data root's
feedback directory. Its fields are submission_id, category, message and a saved
UTC timestamp. The draft UUID is also its receipt; retrying the same content
returns that receipt, while changed content with the same receipt is refused.
The server rejects extra fields. A damaged or linked record is preserved and
reported as unreadable rather than replaced. A linked collection directory is
refused. Collection is capped at 200 JSON records; full collection produces an
error and preserves the draft instead of deleting old feedback.

We considered a browser-only copy/download form. It requires every learner to
hand over an individual report and can easily lose comments. Local collection
supports the requested compiled-email workflow without a third-party connection.
Separate records avoid one damaged file blocking all collection. The API uses
the existing loopback, Host, Origin and session-token checks, with no programme
acknowledgement gate so onboarding problems can be reported. It is not a secure
multi-user inbox; same-user processes remain outside the app's boundary.

## Verification and limits

Unit and HTTP tests use fake comments and temporary data. Browser checks cover
save failure/retry, navigation, explicit review, escaping, clipboard fallback,
plain-text download and narrow layouts. These tests do not establish learner
acceptance, screen-reader accessibility, email delivery or network separation.

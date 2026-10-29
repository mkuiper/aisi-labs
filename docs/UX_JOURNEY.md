# Learner journey changes

29 October 2026. These changes respond to a local UX review of the launchpad,
Getting started, chatbot practice and project pages. The review inspected the
interface and code; it did not observe learners or establish accessibility
conformance.

## Design choices

- Getting started retains three visible route choices. The selected route is
  shown using the existing `#first-session/<id>` link, so it can be reopened and
  shared without adding a stored preference. We considered showing all three
  complete routes and native expandable sections. Showing one chosen route
  reduces the long page while retaining clear switching and offline practice.
- The chatbot prompt has an explicit copy action and remains selectable if copy
  fails. The directory links back to the exercise. A provider is never sent a
  prompt automatically; the external-site confirmation remains in place.
- The home page names the first project most recently created. The server sorts
  by creation date, not by the last time someone opened it. We chose an accurate
  label over adding activity tracking or calling it the last-used project.
- Project guidance links to the existing gated Files action. This keeps the
  launch allowlist and permission boundary intact while making the first step
  easier to find.
- The evidence exercise keeps the three existing check indexes and places the
  answers in its existing reveal. This preserves project checkmarks and lets a
  learner make a judgement before seeing the solution.
- Mobile navigation uses a labelled button with a visible expanded state and
  closes after navigation. Search, the safety banner and session links remain
  available. Essential helper text is larger and darker.

## Evidence and remaining work

The isolated browser smoke test exercises route switching and deep links,
clipboard success and failure, the directory return link, project launch gating,
the answer reveal and keyboard access to the mobile menu. It checks one practice
guidance colour pair against the normal-text 4.5:1 ratio and checks narrow
layouts. The ratio follows [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html);
the test does not cover every colour pair. The unit and HTTP suite uses temporary
data and fake fixtures. The
content audit identifies review debt; it does not certify content accuracy.

Observe novice and experienced learners trying a first activity and returning to
a project. Check keyboard use, screen readers, text zoom and contrast on the
intended laptop image. Test real accounts and tool readiness separately using
the deployment acceptance process. No user study, screen-reader audit, live
authentication, model call or network acceptance is claimed by these checks.

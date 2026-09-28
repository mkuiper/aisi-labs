# Credentials and configuration

## Start with the setup guide

Configuration now starts with Set up access to an AI tool, before the optional
password fields. It distinguishes website accounts, native tool sign-in and
provider API keys. An API key is not required to read Labs, use the simulations
or open ordinary desktop tools. Account eligibility still matters for live AI.

Agree the permitted dedicated learning account, payer and budget with the
facilitator before signing up or enabling billing. ONLY public information;
nothing OFFICIAL. NEVER use government networks, government accounts, workplace
SSO or keys connected to internal resources. Use the offline activities when
access is unavailable; learners should not have to buy access to participate.

Each supported provider card has expandable sign-in alternatives, key-creation
steps, an official key-console destination and source links. The console button
requires the session acknowledgement and a destination confirmation. Reading
the guide is offline; documentation links are labelled as online. No account,
key or payment is created automatically. Do not enter secrets into the model
preference fields or copy provider shell examples containing keys into history.

The canonical learner instructions and source URLs are in
content/setup_guidance.json, reviewed as guide:tool-access. Avoid maintaining a
second provider walkthrough here. Documentation checked 29 September 2026;
console destinations were taken from official documentation, not a signed-in
walkthrough. OpenAI's console returned no readable content and AI Studio's
console was inaccessible to the review tool. Account/region eligibility,
current prices and live authentication were not tested.

Check access explains a manual first-use check and common failures. Set for
session confirms storage only. Any live public prompt is a separate, authorised
and potentially chargeable action inside the tool. Facilitator preparation and
the finish-session guide cover separate accounts, image hygiene and cleanup;
forgetting a Labs key is neither native logout nor provider revocation.

## Supported integrations

Configuration accepts dedicated learning API keys for OpenAI → Codex, Anthropic → Claude Code, and Google AI Studio → Gemini CLI. Every other tool continues to use its own sign-in and configuration. A key saved for one provider is not passed to unrelated tools or to the standalone terminal/editor launch.

Authentication is an explicit exception to the public-content rule: a secret is entered only in a password field to authenticate a permitted learning service. It must not grant access to government systems, and it must never be put in a model prompt, project, memory file or the master image.

## Model preferences and Grok

Model selection is independent of credential storage. Labs can pass an exact
model ID or alias to Codex, Claude Code, Gemini CLI and Grok on the next launch.
An empty value leaves native configuration in control. These non-secret values
persist in models.json; do not put API keys in a model field. The hub does not
verify availability, account entitlement, current pricing or model quality.

Grok currently uses its native authentication, with guidance in Configuration.
Its official setup supports browser login and XAI_API_KEY, but Labs does not yet
inject xAI keys. Validate the installed version's background leader, existing
login precedence, endpoint configuration and key rotation before adding that
adapter. A saved model does not authenticate a tool.

Other AI tools use their own configuration and login. Desktop tools need no hub
API key to open. Do not distribute one provider key to every launcher by default.

## Storage and removal

Keys are retained only in the running Python hub's memory. They are not written to a hub configuration file, browser storage, a command line or application log, and are never returned by the settings/status API. No provider request is made when a key is set, replaced or forgotten. The key's validity, permissions and balance are not verified by the hub.

Closing the app window leaves the hub running, so keys remain until forgotten or the server stops. Forget all keys affects future launches. It does not clear a running child process, sign out an external tool or revoke a key at its provider. The hub cannot guarantee zeroisation of process memory or prevent OS swap/crash dumps. Tools may store credentials or diagnostic information themselves. Separate learner accounts and appropriate device controls remain necessary.

## Launch behaviour

- Codex: a per-launch named provider uses OPENAI_API_KEY and the official OpenAI API endpoint. Configuration is passed as non-secret command-line options and uses the current CLI's no-daemon mode; the secret is in the process environment. Existing sign-in and config files are not overwritten. The configured model must be available to the API project.
- Claude Code: ANTHROPIC_API_KEY is supplied with the official Anthropic endpoint. API billing may take precedence over subscription usage. The tool may ask for confirmation.
- Gemini CLI: GEMINI_API_KEY is supplied. Choose Use Gemini API key inside the CLI when needed. Google login and Vertex AI are separate authentication paths.

For a configured key, Labs starts an independent Ghostty process directly, because the Omarchy uwsm-app daemon forwards command arguments but not the caller's per-launch environment. The secret is not passed through uwsm arguments. The tool retains its normal permission controls. Existing tool configuration and machine-level policies can still affect its behaviour; validate on the image's pinned tool versions.

## Cost and access

Use provider projects/accounts intended for learning. Set the provider's available budget controls, quotas and alerts before use, and check what is actually enforced rather than assuming an alert is a hard limit. API billing can be separate from a paid chat subscription. The hub has no account-balance view and no spending enforcement.

If a key fails, inspect the provider account, selected authentication method and model availability. Do not paste the key into a support ticket or ask an AI to diagnose it. If exposed, revoke it with the provider and replace it using Configuration.

## Documentation used for the adapters

Reviewed 27 September 2026. The Configuration cards link directly to the official guides. Check them again when changing tool versions.

- OpenAI Codex authentication: https://developers.openai.com/codex/auth/
- OpenAI configuration reference: https://developers.openai.com/codex/config-reference/
- Claude Code authentication: https://code.claude.com/docs/en/authentication
- Gemini CLI authentication: https://geminicli.com/docs/get-started/authentication/

Automated tests use fake credentials and mocked launches. They verify handling, scoping, persistence boundaries and adapter arguments without calling a model or spending money. Live provider authentication must be validated with dedicated test credentials during image acceptance.

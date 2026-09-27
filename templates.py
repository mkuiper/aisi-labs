"""Offline, fictional starter material. Each attempt gets its own copy."""

PAGE = '''<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>My learning project</title>
<style>body{font:18px/1.6 system-ui;max-width:760px;margin:10vh auto;padding:24px;background:#f6f4ed;color:#243c35}h1{font-size:48px;line-height:1.1}small{color:#597268}article{background:white;padding:32px;border-radius:16px}</style>
<small>AISI LABS 2 · FICTIONAL PRACTICE PROJECT</small><h1>A small beginning.</h1>
<article><h2>Your project is ready to grow.</h2><p>Read BRIEF.md, then ask your chosen assistant to help build your idea here.</p><p>This starter works offline. Return to the lab for your prompt and checks.</p></article></html>
'''

BRIEFS = {
    "first-steps": "Build a welcoming one-page website for a fictional community learning day. Include a title, three activity cards and a clear next step. Make it readable on small screens. Use plain HTML and CSS in index.html, with no external assets or dependencies. Do not invent a real event or collect personal data.",
    "consultation": "Create an offline explorer for the six fictional submissions in submissions.csv. Show each original ID and comment, add a topic filter and display correct counts. Keep all data in the page so it opens as a local file. Label it fictional and do not claim this sample represents the public. Use no external dependencies.",
    "data-story": "Create an offline chart of the fictional monthly requests in service-data.csv. Include the exact data in a table, labels for months and units, and a text explanation. Use no external libraries. Do not claim a cause for the change. Make it readable on a narrow screen and without colour.",
    "evidence": "Compare draft.md with evidence.md. Create a claim-to-source table and corrected-brief.md. Preserve the source's uncertainty and sample size. Do not add external facts. Explain which claims are supported, contradicted or not established.",
    "blank": "Replace this paragraph with your learning idea.\n\n## Outcome\nWhat should exist when you finish?\n\n## Audience\nWho will use it?\n\n## Inputs\nWhich public sources or supplied public practice files may be used?\n\n## Boundaries\nWhat needs your approval?\n\n## Checks\nHow will you know it works?",
}

def starter_files(lab):
    files = {"BRIEF.md": f"# {lab['title']}\n\n{BRIEFS[lab['id']]}\n\n## Australian AI Safety Institute — APS professional development\nInput ONLY public information. NEVER enter OFFICIAL or higher-classified material, internal work documents or non-public personal information. The supplied fictional datasets are public practice material; changing names in internal material does not make it public.\n\nNEVER connect this learning laptop to government networks, Wi-Fi, Ethernet, VPNs, remote desktops or other bridges into government systems. Use a separate non-government learning network. Do not connect government accounts or internal services.\n\nReview tool permissions, outputs and API costs. A project folder is not a security sandbox; your tool's own permissions apply.\n\n## Starter prompt\n{lab['prompt']}\n"}
    if "index.html" in lab["files"]:
        files["index.html"] = PAGE
    if lab["id"] == "consultation":
        files["submissions.csv"] = 'id,topic,comment\nS01,Access,"Longer opening hours would help shift workers."\nS02,Transport,"A bus stop closer to the centre would help."\nS03,Access,"Please offer a quiet appointment time."\nS04,Digital,"An online booking option would be useful."\nS05,Transport,"More bicycle parking would help."\nS06,Digital,"Keep phone bookings for people without internet."\n'
    if lab["id"] == "data-story":
        files["service-data.csv"] = "month,requests\nJanuary,120\nFebruary,135\nMarch,128\nApril,160\nMay,155\nJune,174\n"
    if lab["id"] == "evidence":
        files["evidence.md"] = "# Fictional trial notes\n\nE1. Twenty volunteers took part in a four-week trial of a new appointment reminder.\n\nE2. Twelve of the twenty said the reminder was helpful.\n\nE3. The trial had no comparison group. We did not measure whether it changed attendance.\n\nE4. No cost or savings analysis was undertaken.\n"
        files["draft.md"] = "# Draft for checking — deliberately contains errors\n\nThe trial proved that reminders improved attendance. Eighty per cent of the twenty participants found the reminder helpful. Rolling out the system will save $2 million each year.\n"
    return files

---
name: pqc-instruction-paper
description: Scan the PQC source catalog and rewrite the unified instruction paper for regulated organizations. Use when refreshing docs/pqc-regulated-instructions.md, when a scheduled PQC run starts, or when the user asks to update post-quantum instructions from NIST, regulators, or the listed implementers.
---

# PQC instruction paper

Rewrite `docs/pqc-regulated-instructions.md` from the live pages in `pqc/sources.json`. The paper is for regulated organizations. It is an assembly of sourced instructions, not legal advice and not a new standard.

## Every run

1. Read `pqc/sources.json`. Fetch every `url`. Follow redirects. Prefer the final publication over a blog summary of it.
2. Extract only instructions a regulated organization can act on: strategic and organizational duties, peer duties (suppliers, partners, clients, SaaS providers, and cloud providers), and technical duties for algorithms, parameters, timelines, protocols, certificates, keys, hashes, and vaults.
3. Replace the whole markdown file. Do not append a second copy of an old run.
4. Open a pull request when the file changes. Leave the branch unchanged when every fetched page still supports the current bullets.
5. Email the finished markdown file on every run, including a run that does not change the paper. Send it with the connected Gmail account `avivizel@gmail.com` to `aviv@il.ibm.com`. Attach `docs/pqc-regulated-instructions.md` as `pqc-regulated-instructions.md` (`text/markdown`). The plain-text body states the run date, whether the paper changed, and the next run date. Do not paste the paper into the body.
6. Do not edit `pqc/sources.json` except to replace a dead URL with the successor page on the same organization's site. Record that replacement as its own bullet.

## Bullet rules

- One instruction per bullet. Split combined obligations.
- Sort every instruction into the action waves in the output skeleton. Wave 1 is the most important wave. Inside a wave, action 1 is the most important action. Do not regroup by technology.
- Keep strategic and organizational instructions in the same waves as the technical work they govern. Do not leave them in a side section.
- Peer instructions name the other party: supplier, partner, client, SaaS provider, or cloud provider.
- Start each action with its priority number, then one of `Strategic`, `Organizational`, `Peer`, or `Technical`, then the instruction, then `Recommended owner: <role>.` The owner is staffing guidance for this paper. Do not imply the cited document appointed that role.
- End every bullet with the source in this form: `(Source: Organization name, [document title](url))`.
- Use the page you actually fetched. If a page fails, put one bullet for that source under `## Unverified this run` and do not carry forward claims that depended only on it.
- Keep conflicting rules as separate bullets. Name the jurisdiction in the instruction. Do not average them into one parameter set.
- Tag platform statements with the words `Platform practice` at the start of the bullet. IBM, Google, AWS, Microsoft, and Cloudflare do not set regulatory requirements.
- Omit exploit steps, parameters for attacks, and anything that is not an instruction.
- Date the paper with the run date. State the next scheduled run.

## Precedence to apply when writing, and to state in the paper

1. The statute, directive, or sector rule that binds the organization.
2. The algorithm FIPS or NIST SP.
3. The protocol RFC.
4. The national agency's parameter choice.
5. Platform practice, only for systems hosted on that platform.

## Output skeleton

Use these headings, in order:

- Status
- Executive summary
- How to read an action
- Precedence
- Wave 1 — Govern and discover
- Wave 2 — Protect data that can be harvested now
- Wave 3 — Align suppliers, partners, clients, SaaS, and cloud
- Wave 4 — Move signatures, certificates, keys, and vaults
- Wave 5 — Finish on the published dates
- Unverified this run
- Doto list
- Appendix: sources

Open with an executive summary a board member can read without the waves. Before the appendix, add `## Doto list`: one markdown table of every numbered action in the waves, plus the unverified item. Sort rows from the immediate action to the furthest published date. Columns: Order, When, Wave, Type, Action, Recommended owner. The Action cell repeats the instruction and omits the source citation. Use only dates and sequencing the actions already state. Do not invent a year. An action that starts now and names a later finish date appears once, among the immediate rows, and the When cell states both. Close with an appendix that lists every entry in `pqc/sources.json` (name, role, jurisdiction, url). Jurisdiction-specific parameter choices stay inside the wave where the action sits. Do not add a second copy of those choices grouped by country.

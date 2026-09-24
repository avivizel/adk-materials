---
name: pqc-instruction-paper
description: Scan the PQC source catalog and rewrite the unified instruction paper for regulated organizations. Use when refreshing docs/pqc-regulated-instructions.md, when a scheduled PQC run starts, or when the user asks to update post-quantum instructions from NIST, regulators, or the listed implementers.
---

# PQC instruction paper

Rewrite `docs/pqc-regulated-instructions.md` from the live pages in `pqc/sources.json`. The paper is for regulated organizations. It is an assembly of sourced instructions, not legal advice and not a new standard.

## Every run

1. Read `pqc/sources.json`. Fetch every `url`. Follow redirects. Prefer the final publication over a blog summary of it.
2. Extract only instructions a regulated organization can act on: algorithms, parameters, timelines, protocols, certificates, keys, hashes, vaults, and starting-phase duties.
3. Replace the whole markdown file. Do not append a second copy of an old run.
4. Open a pull request when the file changes. Leave the branch unchanged when every fetched page still supports the current bullets.
5. Do not edit `pqc/sources.json` except to replace a dead URL with the successor page on the same organization's site. Record that replacement as its own bullet.

## Bullet rules

- One instruction per bullet. Split combined obligations.
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
- How to use this paper
- Precedence
- Algorithms and parameters
- Timelines
- TLS and other protocols
- Certificates, keys, and hashing
- Vaults and HSMs
- Starting phase
- Israel
- European Union and national agencies
- United States
- United Kingdom, Canada, Australia, and Japan
- Platform practice
- Unverified this run

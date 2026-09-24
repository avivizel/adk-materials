# Unified PQC instructions for regulated organizations

Status date: 24 September 2026. Next scheduled run: 1 October 2026 at 08:00 UTC, then the 15th and the 1st thereafter.

This paper assembles instructions from the catalog in `pqc/sources.json`. It is not legal advice and it does not replace the document cited on each bullet. One bullet is one instruction.

## Executive summary

Start with governance, not with a certificate swap. Name an owner, put a preparedness plan in front of the board, and inventory every encrypted asset, including links to suppliers, partners, clients, SaaS providers, and cloud providers. Stop buying systems that cannot negotiate a post-quantum or hybrid key establishment.

The most important technical work is key establishment on data an attacker can record now and decrypt later. Where no stricter local rule applies, deploy the hybrid TLS group X25519MLKEM768 (ML-KEM-768 with X25519) and plan general signatures as ML-DSA-65. US national security systems use CNSA 2.0 instead: ML-KEM-1024, ML-DSA-87, AES-256, and SHA-384 or SHA-512. Do not deploy FN-DSA, HQC, or pre-standard Kyber, Dilithium, or SPHINCS+.

Do not ask clients or partners for public-web post-quantum certificates in this phase. Public trust anchors have not generally authorized them. Do treat suppliers, SaaS providers, and cloud providers as in scope of the program: contracts must require crypto-agility, and each cloud is followed only for workloads on that cloud.

Five waves follow, most important first. Inside each wave, action 1 is the most important. The recommended owner is staffing guidance for this paper. The cited source does not appoint that person.

1. Govern and discover.
2. Protect data that can be harvested now.
3. Align suppliers, partners, clients, SaaS providers, and cloud providers.
4. Move signatures, certificates, keys, and vaults.
5. Finish on the published dates (about 2030 for high-risk and deprecation, about 2035 for broad completion).

## How to read an action

- Apply every bullet whose source binds your organization, then the algorithm and protocol bullets that no stricter local rule overrides. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
- Treat a bullet that begins with "Platform practice" as a duty only for workloads on that platform. (Source: AWS ML-KEM TLS, [ML-KEM post-quantum TLS now supported in AWS KMS, ACM, and Secrets Manager](https://aws.amazon.com/blogs/security/ml-kem-post-quantum-tls-now-supported-in-aws-kms-acm-and-secrets-manager/))
Read the waves from 1 to 5. Read the numbered actions inside a wave from 1 downward. A later wave is still mandatory. It is not this quarter's first job.

## Precedence

- Follow, in order, the statute or sector rule that binds the system, then the NIST FIPS or SP, then the protocol RFC, then the national agency parameter choice, then platform practice. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))
- Where two authorities name different parameter sets, apply the set required for that system instead of blending the two. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))

## Wave 1 — Govern and discover

This wave is first because every later action depends on an owner, a rulebook, and an inventory. Strategic and organizational work sits here, ahead of protocol changes.

1. Strategic. Name an owner and publish a roadmap with discovery finished, high-risk migration by 2030, and remaining migration by 2035. Recommended owner: CISO, accountable to the board. (Source: UK NCSC, [Timelines for migration to post-quantum cryptography](https://www.ncsc.gov.uk/sites/default/files/pdfs/publication/pqc-migration-timelines.pdf))
2. Strategic. The board and management discuss an initial quantum preparedness plan. For banking corporations and licensed payment service providers, that plan was due to Banking Supervision within one year of 7 January 2025. Recommended owner: Board and executive management. (Source: Bank of Israel Banking Supervision, [Letter 202501, 7 January 2025](https://www.boi.org.il/en/economic-roles/supervision-and-regulation/letters/letter202501en))
3. Organizational. Banking corporations and licensed payment service providers raise awareness of quantum risk and keep watching PQC and QKD developments. Recommended owner: CISO. (Source: Bank of Israel Banking Supervision, [Letter 202501, 7 January 2025](https://www.boi.org.il/en/economic-roles/supervision-and-regulation/letters/letter202501en))
4. Organizational. Review the risk and the operational impact of moving to quantum-resistant algorithms. Recommended owner: CISO, with business owners. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
5. Organizational. Map organizational cyber assets, including protocol, algorithm, key-exchange frequency, hash, and the confidentiality lifetime of data at rest, in transit, and in processing. Recommended owner: CISO, with application owners. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
6. Organizational. Inventory every key, certificate, protocol, library, and module, including algorithm, owner, and how long the data must stay confidential. Recommended owner: CISO and PKI engineering. (Source: NIST NCCoE Migration to PQC, [Migration to Post-Quantum Cryptography](https://www.nccoe.nist.gov/projects/migration-post-quantum-cryptography))
7. Organizational. Critical infrastructure operators inventory cryptography and prioritize harvest-now-decrypt-later exposure using the joint CISA, NIST, and NSA quantum-readiness guidance. Recommended owner: CISO. (Source: CISA, [Quantum-Readiness: Migration to Post-Quantum Cryptography](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/article/3498776/post-quantum-cryptography-cisa-nist-and-nsa-recommend-how-to-prepare-now/))
8. Organizational. Banking corporations and licensed payment service providers map and manage encrypted information assets under Proper Conduct of Banking Business Directive 364. Recommended owner: Sector compliance lead, with the CISO. (Source: Bank of Israel Banking Supervision, [Letter 202501, 7 January 2025](https://www.boi.org.il/en/economic-roles/supervision-and-regulation/letters/letter202501en))
9. Strategic. Stop commissioning new systems that cannot negotiate a PQC or hybrid key establishment. Recommended owner: Enterprise architecture and procurement. (Source: European Commission Recommendation (EU) 2024/1101, [Recommendation (EU) 2024/1101](https://eur-lex.europa.eu/eli/reco/2024/1101/oj/eng))
10. Organizational. Instruct development teams to use the PQC algorithms NIST recommends at the time. Recommended owner: Engineering leadership. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
11. Organizational. Banking corporations and licensed payment service providers prepare staff, a test environment, and an infrastructure assessment for post-quantum encryption. Recommended owner: CISO. (Source: Bank of Israel Banking Supervision, [Letter 202501, 7 January 2025](https://www.boi.org.il/en/economic-roles/supervision-and-regulation/letters/letter202501en))
12. Strategic. European Member States complete the first steps, publish a national PQC roadmap, and start high- and medium-risk pilots by 31 December 2026. Recommended owner: Public-sector program owner. (Source: EU NIS Cooperation Group PQC roadmap, [EU reinforces its cybersecurity with post-quantum cryptography](https://digital-strategy.ec.europa.eu/en/news/eu-reinforces-its-cybersecurity-post-quantum-cryptography))
13. Strategic. Complete the UK migration by 2035, with large organisations spending the first two to three years on discovery, assessment, and an initial plan. Recommended owner: CISO. (Source: UK NCSC, [Timelines for migration to post-quantum cryptography](https://www.ncsc.gov.uk/sites/default/files/pdfs/publication/pqc-migration-timelines.pdf))
14. Strategic. Member States coordinate their public-sector and critical-infrastructure migration through the NIS Cooperation Group roadmap. Recommended owner: Public-sector program owner. (Source: European Commission Recommendation (EU) 2024/1101, [Recommendation (EU) 2024/1101](https://eur-lex.europa.eu/eli/reco/2024/1101/oj/eng))
15. Strategic. Federal civilian systems follow NIST PQC standards and the IR 8547 transition approach. Recommended owner: US federal system owner. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
16. Strategic. National security systems follow CNSSP 15 and CNSA 2.0, not the general internet default of ML-KEM-768 and ML-DSA-65. Recommended owner: National-security system owner. (Source: NSA CNSA 2.0, [Post-Quantum Cybersecurity Resources](https://www.nsa.gov/Cybersecurity/Post-Quantum-Cybersecurity-Resources/))
17. Strategic. Follow the Government of Canada roadmap in ITSM.40.001 for Canadian federal systems. Recommended owner: Canadian federal system owner. (Source: Canadian Centre for Cyber Security, [ITSM.40.001](https://www.cyber.gc.ca/en/guidance/roadmap-migration-post-quantum-cryptography-government-canada-itsm40001))
18. Strategic. Australian government systems follow the Australian Signals Directorate's planning guidance for post-quantum cryptography. Recommended owner: Australian government system owner. (Source: Australian Signals Directorate, [ASD ACSC](https://www.cyber.gov.au/))
19. Strategic. Japanese government systems follow CRYPTREC cryptographic evaluation. Recommended owner: Japanese government system owner. (Source: CRYPTREC Japan, [CRYPTREC](https://www.cryptrec.go.jp/en.html))
20. Strategic. German regulated systems take algorithm and hybrid choices from the current BSI TR-02102-1, not from another country's parameter table. Recommended owner: Cryptography engineering. (Source: BSI Germany, [BSI](https://www.bsi.bund.de/))
21. Strategic. French regulated systems take algorithm choices from the current ANSSI PQC position. Recommended owner: Cryptography engineering. (Source: ANSSI France, [ANSSI](https://cyber.gouv.fr/))
22. Strategic. Dutch regulated systems take algorithm choices from the current NLNCSA migration guidance. Recommended owner: Cryptography engineering. (Source: NLNCSA Netherlands, [NLNCSA](https://www.nlcsa.nl/))
23. Strategic. US financial institutions track ASC X9 quantum-safe profiles in addition to NIST. Recommended owner: Sector compliance lead. (Source: ASC X9, [ASC X9](https://x9.org/))
24. Strategic. Cardholder-data environments follow PCI SSC cryptographic requirements as they are updated for PQC. Recommended owner: Sector compliance lead. (Source: PCI Security Standards Council, [PCI SSC](https://www.pcisecuritystandards.org/))
25. Strategic. If QKD is assessed, include classical side channels in the review and do not treat QKD as a substitute for PQC. Recommended owner: CISO. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
26. Strategic. NSA does not approve quantum key distribution for protecting national security systems. Recommended owner: National-security system owner. (Source: NSA CNSA 2.0, [Post-Quantum Cybersecurity Resources](https://www.nsa.gov/Cybersecurity/Post-Quantum-Cybersecurity-Resources/))
27. Organizational. Use the ENISA April 2026 hybridisation report as a map of standards work, and treat it as technical input only: ENISA states that the report is not itself a recommendation. Recommended owner: Cryptography engineering. (Source: ENISA, [Hybridization of traditional cryptographic mechanisms with PQC, 30 April 2026](https://certification.enisa.europa.eu/document/download/02f54596-6a99-4c9e-88c4-8c711ebff9c1_en?filename=ENISA+report+-+Hybridization+of+traditional+cryptographic+mechanisms+with+PQC+-+Standardisation+Status+-+30+April+2026+.pdf))
28. Organizational. Review NIST cryptography publications on a repeating schedule. Recommended owner: CISO. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
29. Organizational. Re-read this paper when FIPS 206, the HQC FIPS, or a final IR 8547 is published. Recommended owner: CISO. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))

## Wave 2 — Protect data that can be harvested now

This is the most important technical wave. Recorded key-establishment traffic is the exposure that cannot wait for new certificates. Lengthen symmetric keys and shorten session life while that migration is underway.

1. Technical. Treat finite-field and elliptic-curve Diffie-Hellman and MQV, RSA key establishment, RSA signatures, ECDSA, and EdDSA as the quantum-vulnerable public-key mechanisms named for the transition. Recommended owner: Cryptography engineering. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
2. Technical. Prioritise IPsec/IKEv2, SSH, QUIC, and TLS key establishment on links that carry long-lived secrets. Recommended owner: Network engineering and application owners. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
3. Technical. Deploy hybrid key agreement in TLS 1.3 before migrating authentication certificates. Recommended owner: Infrastructure engineering. (Source: IETF RFC 9954, [RFC 9954](https://www.rfc-editor.org/rfc/rfc9954))
4. Technical. Enable X25519MLKEM768 for public internet TLS. Recommended owner: Infrastructure engineering. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
5. Technical. Use ML-KEM from FIPS 203 for new post-quantum key establishment. Recommended owner: Cryptography engineering. (Source: NIST FIPS 203 ML-KEM, [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final))
6. Technical. For general internet key establishment, use ML-KEM-768 inside a hybrid. Recommended owner: Cryptography engineering. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
7. Technical. For US national security systems, use ML-KEM-1024 for key establishment at every classification level. Recommended owner: National-security system owner. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
8. Technical. Use perfect forward secrecy on existing protocols. Recommended owner: Infrastructure engineering. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
9. Technical. Shorten key and session lifetimes while classical public-key algorithms remain in use. Recommended owner: CISO and infrastructure engineering. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
10. Technical. For new Israeli systems, prefer longer symmetric keys such as AES-256 and SHA-512 while the PQC migration proceeds. Recommended owner: Cryptography engineering. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
11. Technical. Use AES-256 for new high-assurance symmetric encryption. Recommended owner: Cryptography engineering. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
12. Technical. Use SHA-384 or SHA-512 for new long-lived hashes in CNSA 2.0 systems. Recommended owner: Cryptography engineering. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
13. Technical. Accept hybrid schemes during the migration. Recommended owner: Cryptography engineering. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
14. Strategic. Prefer standardised hybrid solutions for the European migration where they are suitable. Recommended owner: Cryptography engineering. (Source: European Commission Recommendation (EU) 2024/1101, [Recommendation (EU) 2024/1101](https://eur-lex.europa.eu/eli/reco/2024/1101/oj/eng))
15. Technical. Build hybrids so the classical half can be removed later. Recommended owner: Cryptography engineering. (Source: UK NCSC, [Next steps in preparing for post-quantum cryptography](https://www.ncsc.gov.uk/paper/next-steps-in-preparing-for-post-quantum-cryptography))
16. Technical. Run operational UK systems on final RFCs, not on Internet-Drafts. Recommended owner: Cryptography engineering. (Source: UK NCSC, [Next steps in preparing for post-quantum cryptography](https://www.ncsc.gov.uk/paper/next-steps-in-preparing-for-post-quantum-cryptography))
17. Technical. UK operational cryptography uses final NIST standards and published RFCs. Recommended owner: Cryptography engineering. (Source: UK NCSC, [Next steps in preparing for post-quantum cryptography](https://www.ncsc.gov.uk/paper/next-steps-in-preparing-for-post-quantum-cryptography))
18. Technical. Use SecP256r1MLKEM768 when both shares must come from FIPS-approved mechanisms and P-256 is the certified curve. Recommended owner: Cryptography engineering. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
19. Technical. Use SecP384r1MLKEM1024 for high-assurance and CNSA-aligned TLS. Recommended owner: Cryptography engineering. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
20. Technical. Pilot SecP384r1MLKEM1024 only where CNSA or an equivalent high-assurance profile applies. Recommended owner: Cryptography engineering. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
21. Technical. For a FIPS key derivation of X25519MLKEM768, certify the ML-KEM implementation, because the ML-KEM secret is first. Recommended owner: Cryptography engineering. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
22. Technical. For a FIPS key derivation of the NIST-curve hybrids, certify the ECDH implementation, because the ECDH secret is first. Recommended owner: Cryptography engineering. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
23. Technical. Implement KEM definitions, security properties, and hybrid combiners as specified in SP 800-227. Recommended owner: Cryptography engineering. (Source: NIST SP 800-227 KEMs, [SP 800-227](https://csrc.nist.gov/pubs/sp/800/227/final))
24. Technical. For US national security IKEv2, keep a classical establishment step where the ML-KEM-1024 public key does not fit in the unencrypted messages, and fortify it with ML-KEM-1024. Recommended owner: National-security system owner. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
25. Technical. Pilot X25519MLKEM768 on external TLS and record handshake size and middlebox failures. Recommended owner: Infrastructure engineering. (Source: Cloudflare post-quantum Internet, [State of the post-quantum Internet in 2025](https://blog.cloudflare.com/pq-2025/))
26. Technical. Platform practice: enable X25519MLKEM768 on Google Cloud load balancers; Google Cloud turns it on by default after October 2026 and requires it after October 2027. Recommended owner: Cloud platform owner. (Source: Google Cloud post-quantum TLS, [Post-quantum TLS](https://docs.cloud.google.com/load-balancing/docs/post-quantum-tls))
27. Technical. Platform practice: on Windows 11 and Windows Server 2025, use the SymCrypt and CNG ML-KEM and ML-DSA APIs, and require TLS 1.3 before enabling hybrid key exchange. Recommended owner: Infrastructure engineering. (Source: Microsoft quantum-safe security, [Quantum-safe security](https://www.microsoft.com/en-us/security/blog/2025/08/20/quantum-safe-security-progress-towards-next-generation-cryptography/))
28. Technical. Keep existing rotation, audit, and separation-of-duties controls, and wrap ML-KEM session keys with AES-256-GCM or another approved mode. Recommended owner: Vault operations. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))

## Wave 3 — Align suppliers, partners, clients, SaaS, and cloud

The organization's own migration fails if the other party on the link still offers only a classical handshake, or if a purchased system cannot be upgraded. These actions are aimed at those peers. They sit after internal discovery and the harvest-now priority, and before a certificate-program redesign.

1. Peer. Contractually require suppliers to ship crypto-agility, meaning advanced cryptography can be upgraded without a material product change. Recommended owner: Procurement and legal, with the CISO. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
2. Peer. Put crypto-agility and a PQC test requirement into supplier contracts. Recommended owner: Procurement and vendor management. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
3. Peer. Apply that supplier crypto-agility clause to SaaS providers that store or transmit the organization's data. Recommended owner: Procurement and vendor management. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
4. Peer. Buy only products that identify algorithms explicitly and accept public keys and signatures of several kilobytes. Recommended owner: Procurement. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
5. Peer. Include supplier, partner, client, SaaS, and cloud links in the asset map, with protocol, algorithm, key-exchange frequency, hash, and confidentiality lifetime. Recommended owner: CISO and the relationship owner. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
6. Peer. On partner and supplier links that carry long-lived secrets, deploy hybrid key agreement before asking those peers to change authentication certificates. Recommended owner: Network engineering. (Source: IETF RFC 9954, [RFC 9954](https://www.rfc-editor.org/rfc/rfc9954))
7. Peer. Tell clients and partners that connect to you what hybrid group you offer, and record their handshake failures before you require the group. Recommended owner: Product and customer engineering. (Source: Cloudflare post-quantum Internet, [State of the post-quantum Internet in 2025](https://blog.cloudflare.com/pq-2025/))
8. Peer. Platform practice: use Cloudflare's published client-support census to decide when X25519MLKEM768 can be required of clients on a public site. Recommended owner: Product and customer engineering. (Source: Cloudflare post-quantum Internet, [State of the post-quantum Internet in 2025](https://blog.cloudflare.com/pq-2025/))
9. Peer. Platform practice: AWS KMS, Certificate Manager, and Secrets Manager offer ML-KEM hybrid key agreement on non-FIPS endpoints, and customers must update clients so the hybrid group is offered. Recommended owner: Product engineering, for client-facing AWS use. (Source: AWS ML-KEM TLS, [ML-KEM post-quantum TLS now supported in AWS KMS, ACM, and Secrets Manager](https://aws.amazon.com/blogs/security/ml-kem-post-quantum-tls-now-supported-in-aws-kms-acm-and-secrets-manager/))
10. Peer. Platform practice: IBM co-developed the algorithms that became ML-KEM and ML-DSA; follow IBM Quantum Safe guidance for IBM-hosted keys, and ignore leftover Kyber-only endpoint settings. Recommended owner: Cloud platform owner. (Source: IBM Quantum Safe, [IBM Quantum Safe](https://www.ibm.com/quantum/quantum-safe))
11. Peer. Do not ask clients or partners to present ordinary public-web X.509 post-quantum certificates in this phase. Recommended owner: PKI engineering. (Source: Cloudflare post-quantum Internet, [State of the post-quantum Internet in 2025](https://blog.cloudflare.com/pq-2025/))
12. Peer. Leave pure ML-DSA authentication off public websites until the TLS signature specification is an RFC and the relevant root program allows the certificates. Recommended owner: PKI engineering. (Source: CA/Browser Forum Ballot SMC013, [Ballot SMC013](https://cabforum.org/2025/07/02/ballot-smc-013/))

## Wave 4 — Move signatures, certificates, keys, and vaults

Signatures matter now for firmware, software, and other long-lived roots. They matter less, this quarter, than hybrid key establishment on the public internet. National-security system owners treat firmware and software signing as immediate work inside this wave, not as a 2030 task.

1. Technical. For US national security systems, sign new software and firmware with CNSA 2.0 algorithms, and finish deployed software and firmware signatures by 2030. Recommended owner: Product security. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
2. Technical. For firmware and software signing, use LMS or XMSS from SP 800-208 when the signer can enforce state in hardware. Recommended owner: Product security. (Source: NIST SP 800-208 LMS and XMSS, [SP 800-208](https://csrc.nist.gov/pubs/sp/800/208/final))
3. Technical. NSA prefers LMS with SHA-256/192 for software and firmware signing, and approves the other SP 800-208 parameter sets. Recommended owner: National-security system owner. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
4. Technical. Put LMS and XMSS signing and state management in hardware, and design backup so the counter cannot rewind. Recommended owner: Vault operations. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
5. Technical. Treat an LMS or XMSS private key as a counter: one signer, monotonic state, no reuse after backup or restore. Recommended owner: Vault operations. (Source: NIST SP 800-208 LMS and XMSS, [SP 800-208](https://csrc.nist.gov/pubs/sp/800/208/final))
6. Technical. Use ML-DSA from FIPS 204 for general post-quantum signatures. Recommended owner: Cryptography engineering. (Source: NIST FIPS 204 ML-DSA, [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final))
7. Technical. Where no stricter profile applies, use ML-DSA-65. Recommended owner: Cryptography engineering. (Source: UK NCSC, [Next steps in preparing for post-quantum cryptography](https://www.ncsc.gov.uk/paper/next-steps-in-preparing-for-post-quantum-cryptography))
8. Technical. For US national security systems, use ML-DSA-87 for general signatures. Recommended owner: National-security system owner. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
9. Technical. Use SLH-DSA from FIPS 205 where a stateless hash-based signature is required. Recommended owner: Cryptography engineering. (Source: NIST FIPS 205 SLH-DSA, [FIPS 205](https://csrc.nist.gov/pubs/fips/205/final))
10. Technical. CNSA 2.0 does not include SLH-DSA; national security systems follow the CNSA algorithm list instead. Recommended owner: National-security system owner. (Source: NSA CNSA 2.0, [Post-Quantum Cybersecurity Resources](https://www.nsa.gov/Cybersecurity/Post-Quantum-Cybersecurity-Resources/))
11. Technical. Reject pre-standard Kyber, Dilithium, and SPHINCS+ deployments; they are not interoperable with FIPS 203, 204, and 205. Recommended owner: Cryptography engineering. (Source: IETF RFC 9881, [RFC 9881](https://www.rfc-editor.org/rfc/rfc9881))
12. Technical. Keep FN-DSA (planned FIPS 206) out of production until the FIPS is final and modules are validated. Recommended owner: Cryptography engineering. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))
13. Technical. Treat HQC as selected, not yet a production FIPS; wait for the final standard and validated modules. Recommended owner: Cryptography engineering. (Source: NIST IR 8545 HQC selection, [IR 8545](https://csrc.nist.gov/pubs/ir/8545/final))
14. Technical. Lab-issue private ML-DSA chains under RFC 9881, and leave public web trust anchors unchanged in this phase. Recommended owner: PKI engineering. (Source: IETF RFC 9881, [RFC 9881](https://www.rfc-editor.org/rfc/rfc9881))
15. Technical. Platform practice: Chrome is not adding ordinary X.509 post-quantum certificates to the public Chrome Root Store; watch the IETF PLANTS Merkle Tree Certificate work before planning public-web authentication. Recommended owner: PKI engineering. (Source: Cloudflare post-quantum Internet, [State of the post-quantum Internet in 2025](https://blog.cloudflare.com/pq-2025/))
16. Technical. Encode ML-DSA-44, ML-DSA-65, and ML-DSA-87 in X.509 and CRLs with the RFC 9881 OIDs and with algorithm parameters absent. Recommended owner: PKI engineering. (Source: IETF RFC 9881, [RFC 9881](https://www.rfc-editor.org/rfc/rfc9881))
17. Technical. Keep HashML-DSA out of certificates, CRLs, OCSP, and issuance. Recommended owner: PKI engineering. (Source: IETF RFC 9881, [RFC 9881](https://www.rfc-editor.org/rfc/rfc9881))
18. Technical. Choose either pure SLH-DSA or HashSLH-DSA when the CA key is generated, and keep that mode. Recommended owner: PKI engineering. (Source: IETF RFC 9909, [RFC 9909](https://www.rfc-editor.org/rfc/rfc9909))
19. Technical. Put ML-KEM keys only in certificates whose key usage is keyEncipherment. Recommended owner: PKI engineering. (Source: IETF RFC 9935, [RFC 9935](https://www.rfc-editor.org/rfc/rfc9935))
20. Technical. Issue public S/MIME PQC certificates only as non-hybrid ML-DSA or ML-KEM experiments allowed by S/MIME Baseline Requirements 1.0.11, and follow any stricter root-program rule. Recommended owner: PKI engineering. (Source: CA/Browser Forum Ballot SMC013, [Ballot SMC013](https://cabforum.org/2025/07/02/ballot-smc-013/))
21. Technical. Keep composite ML-DSA certificates in the lab until `draft-ietf-lamps-pq-composite-sigs` is published as an RFC. Recommended owner: PKI engineering. (Source: IETF RFC 9763, [RFC 9763](https://www.rfc-editor.org/rfc/rfc9763))
22. Technical. Generate ML-KEM and ML-DSA keys inside the module that will use them. Recommended owner: Vault operations. (Source: NIST FIPS 203 ML-KEM, [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final))
23. Technical. Store the FIPS seed rather than the expanded private key when the module allows it. Recommended owner: Vault operations. (Source: NIST FIPS 204 ML-DSA, [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final))
24. Technical. Keep KEM keys and signature keys in separate objects. Recommended owner: Vault operations. (Source: IETF RFC 9935, [RFC 9935](https://www.rfc-editor.org/rfc/rfc9935))
25. Technical. Sign with the hedged or randomized ML-DSA procedure in FIPS 204. Recommended owner: Cryptography engineering. (Source: NIST FIPS 204 ML-DSA, [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final))
26. Technical. Leave the hash inside ML-KEM, ML-DSA, and SLH-DSA as the FIPS specifies it. Recommended owner: Cryptography engineering. (Source: NIST FIPS 203 ML-KEM, [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final))
27. Technical. Require CAVP validation of FIPS 203 and FIPS 204 and a CMVP path to FIPS 140-3 before accepting a module for a regulated system. Recommended owner: Procurement and cryptography engineering. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))
28. Technical. Generate and use ML-KEM and ML-DSA keys in the HSM without exporting expanded private keys by default. Recommended owner: Vault operations. (Source: NIST FIPS 203 ML-KEM, [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final))
29. Technical. Size APIs and stores for ML-DSA signatures of about 3 to 5 KB and for SLH-DSA signatures of tens of kilobytes. Recommended owner: Application owners. (Source: NIST FIPS 204 ML-DSA, [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final))
30. Organizational. Store an algorithm identifier with each key so the classical half of a hybrid can be retired without re-issuing every object by hand. Recommended owner: Vault operations. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))

## Wave 5 — Finish on the published dates

These dates are the end state of the roadmap from Wave 1. They are mandatory. They are the lowest priority for work that must start this quarter, because discovery, harvest-now protection, and peer contracts come first.

1. Strategic. Plan to deprecate quantum-vulnerable public-key algorithms around 2030 and to disallow them by 2035, using the approach in the IR 8547 draft until NIST publishes a final report. Recommended owner: CISO. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
2. Strategic. Migrate European high-risk use cases by the end of 2030. Recommended owner: Public-sector program owner. (Source: EU NIS Cooperation Group PQC roadmap, [EU reinforces its cybersecurity with post-quantum cryptography](https://digital-strategy.ec.europa.eu/en/news/eu-reinforces-its-cybersecurity-post-quantum-cryptography))
3. Strategic. Complete the European transition for as many systems as practical by 2035. Recommended owner: Public-sector program owner. (Source: EU NIS Cooperation Group PQC roadmap, [EU reinforces its cybersecurity with post-quantum cryptography](https://digital-strategy.ec.europa.eu/en/news/eu-reinforces-its-cybersecurity-post-quantum-cryptography))
4. Strategic. For US national security web, browser, and cloud services, support and prefer CNSA 2.0 and use it exclusively by 2033. Recommended owner: National-security system owner. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
5. Strategic. Phase out US national security equipment that cannot support CNSA 2.0 by 31 December 2030, and mandate CNSA 2.0 algorithms by 31 December 2031 unless an exception says otherwise. Recommended owner: National-security system owner. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
6. Strategic. Canadian government systems follow ITSM.40.001 through the dates in that roadmap. Recommended owner: Canadian federal system owner. (Source: Canadian Centre for Cyber Security, [ITSM.40.001](https://www.cyber.gc.ca/en/guidance/roadmap-migration-post-quantum-cryptography-government-canada-itsm40001))
7. Strategic. Migration method, as distinct from algorithm choice, may follow ETSI TC CYBER quantum-safe migration publications. Recommended owner: Enterprise architecture. (Source: ETSI TC CYBER QSC, [ETSI](https://www.etsi.org/))
8. Organizational. International product certifications still track ISO/IEC JTC 1/SC 27, which lags the NIST FIPS. Recommended owner: Product security. (Source: ISO/IEC JTC 1/SC 27, [ISO/IEC JTC 1/SC 27](https://www.iso.org/committee/45306.html))
9. Organizational. X.509 directory and PKI changes still track ITU-T Study Group 17. Recommended owner: PKI engineering. (Source: ITU-T Study Group 17, [ITU-T SG17](https://www.itu.int/en/ITU-T/studygroups/2025-2028/17/Pages/default.aspx))

## Unverified this run

- NÚKIB (Czech Republic), CCN (Spain), NSM (Norway), New Zealand NCSC, Singapore CSA, and South Korean cryptographic authorities were not given their own catalog URLs on this run; use the national authority's current publication before citing a parameter set for those jurisdictions. Recommended owner: CISO. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))

## Appendix: sources

The agent fetches this catalog on every run. A bullet may cite the specific document behind a catalog entry. Regulatory and standards entries can set requirements. Implementer entries are platform practice only.

| Name | Role | Jurisdiction | URL |
| --- | --- | --- | --- |
| NIST PQC project | standards | international-algorithm | https://csrc.nist.gov/projects/post-quantum-cryptography |
| NIST FIPS 203 ML-KEM | standards | international-algorithm | https://csrc.nist.gov/pubs/fips/203/final |
| NIST FIPS 204 ML-DSA | standards | international-algorithm | https://csrc.nist.gov/pubs/fips/204/final |
| NIST FIPS 205 SLH-DSA | standards | international-algorithm | https://csrc.nist.gov/pubs/fips/205/final |
| NIST SP 800-208 LMS and XMSS | standards | international-algorithm | https://csrc.nist.gov/pubs/sp/800/208/final |
| NIST SP 800-227 KEMs | standards | international-algorithm | https://csrc.nist.gov/pubs/sp/800/227/final |
| NIST IR 8547 transition draft | standards | united-states | https://csrc.nist.gov/pubs/ir/8547/ipd |
| NIST IR 8545 HQC selection | standards | international-algorithm | https://csrc.nist.gov/pubs/ir/8545/final |
| NIST NCCoE Migration to PQC | standards | united-states | https://www.nccoe.nist.gov/projects/migration-post-quantum-cryptography |
| NSA CNSA 2.0 | regulator | united-states-nss | https://www.nsa.gov/Cybersecurity/Post-Quantum-Cybersecurity-Resources/ |
| NSA CNSA 2.0 FAQ | regulator | united-states-nss | https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF |
| CISA | regulator | united-states | https://www.cisa.gov/ |
| European Commission Recommendation (EU) 2024/1101 | regulator | european-union | https://eur-lex.europa.eu/eli/reco/2024/1101/oj/eng |
| EU NIS Cooperation Group PQC roadmap | regulator | european-union | https://digital-strategy.ec.europa.eu/en/news/eu-reinforces-its-cybersecurity-post-quantum-cryptography |
| ENISA | regulator | european-union | https://www.enisa.europa.eu/ |
| BSI Germany | regulator | germany | https://www.bsi.bund.de/ |
| ANSSI France | regulator | france | https://cyber.gouv.fr/ |
| NLNCSA Netherlands | regulator | netherlands | https://www.nlcsa.nl/ |
| UK NCSC | regulator | united-kingdom | https://www.ncsc.gov.uk/paper/next-steps-in-preparing-for-post-quantum-cryptography |
| UK NCSC migration timelines | regulator | united-kingdom | https://www.ncsc.gov.uk/sites/default/files/pdfs/publication/pqc-migration-timelines.pdf |
| Canadian Centre for Cyber Security | regulator | canada | https://www.cyber.gc.ca/en/guidance/roadmap-migration-post-quantum-cryptography-government-canada-itsm40001 |
| Australian Signals Directorate | regulator | australia | https://www.cyber.gov.au/ |
| CRYPTREC Japan | regulator | japan | https://www.cryptrec.go.jp/en.html |
| Israel National Cyber Directorate | regulator | israel | https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf |
| Bank of Israel Banking Supervision | regulator | israel-banking | https://www.boi.org.il/en/economic-roles/supervision-and-regulation/letters/letter202501en |
| IETF RFC 9954 | standards | internet | https://www.rfc-editor.org/rfc/rfc9954 |
| IETF RFC 10024 | standards | internet | https://www.rfc-editor.org/rfc/rfc10024 |
| IETF RFC 9881 | standards | internet | https://www.rfc-editor.org/rfc/rfc9881 |
| IETF RFC 9909 | standards | internet | https://www.rfc-editor.org/rfc/rfc9909 |
| IETF RFC 9935 | standards | internet | https://www.rfc-editor.org/rfc/rfc9935 |
| IETF RFC 9763 | standards | internet | https://www.rfc-editor.org/rfc/rfc9763 |
| CA/Browser Forum Ballot SMC013 | standards | public-pki | https://cabforum.org/2025/07/02/ballot-smc-013/ |
| ETSI TC CYBER QSC | standards | europe | https://www.etsi.org/ |
| ISO/IEC JTC 1/SC 27 | standards | international | https://www.iso.org/committee/45306.html |
| ITU-T Study Group 17 | standards | international | https://www.itu.int/en/ITU-T/studygroups/2025-2028/17/Pages/default.aspx |
| ASC X9 | sector | united-states-finance | https://x9.org/ |
| PCI Security Standards Council | sector | payments | https://www.pcisecuritystandards.org/ |
| IBM Quantum Safe | implementer | platform | https://www.ibm.com/quantum/quantum-safe |
| Google Cloud post-quantum TLS | implementer | platform | https://docs.cloud.google.com/load-balancing/docs/post-quantum-tls |
| AWS ML-KEM TLS | implementer | platform | https://aws.amazon.com/blogs/security/ml-kem-post-quantum-tls-now-supported-in-aws-kms-acm-and-secrets-manager/ |
| Microsoft quantum-safe security | implementer | platform | https://www.microsoft.com/en-us/security/blog/2025/08/20/quantum-safe-security-progress-towards-next-generation-cryptography/ |
| Cloudflare post-quantum Internet | implementer | platform | https://blog.cloudflare.com/pq-2025/ |

# Unified PQC instructions for regulated organizations

Status date: 24 September 2026. Next scheduled run: 1 October 2026 at 08:00 UTC, then the 15th and the 1st thereafter.

This paper assembles instructions from the catalog in `pqc/sources.json`. It is not legal advice and it does not replace the document cited on each bullet. One bullet is one instruction.

## How to use this paper

- Apply every bullet whose source binds your organization, then the algorithm and protocol bullets that no stricter local rule overrides. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
- Treat a bullet that begins with "Platform practice" as a duty only for workloads on that platform. (Source: AWS ML-KEM TLS, [ML-KEM post-quantum TLS now supported in AWS KMS, ACM, and Secrets Manager](https://aws.amazon.com/blogs/security/ml-kem-post-quantum-tls-now-supported-in-aws-kms-acm-and-secrets-manager/))

## Precedence

- Follow, in order, the statute or sector rule that binds the system, then the NIST FIPS or SP, then the protocol RFC, then the national agency parameter choice, then platform practice. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))
- Where two authorities name different parameter sets, apply the set required for that system instead of blending the two. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))

## Algorithms and parameters

- Use ML-KEM from FIPS 203 for new post-quantum key establishment. (Source: NIST FIPS 203 ML-KEM, [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final))
- For general internet key establishment, use ML-KEM-768 inside a hybrid. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
- For US national security systems, use ML-KEM-1024 for key establishment at every classification level. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Use ML-DSA from FIPS 204 for general post-quantum signatures. (Source: NIST FIPS 204 ML-DSA, [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final))
- Where no stricter profile applies, use ML-DSA-65. (Source: UK NCSC, [Next steps in preparing for post-quantum cryptography](https://www.ncsc.gov.uk/paper/next-steps-in-preparing-for-post-quantum-cryptography))
- For US national security systems, use ML-DSA-87 for general signatures. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Use SLH-DSA from FIPS 205 where a stateless hash-based signature is required. (Source: NIST FIPS 205 SLH-DSA, [FIPS 205](https://csrc.nist.gov/pubs/fips/205/final))
- CNSA 2.0 does not include SLH-DSA; national security systems follow the CNSA algorithm list instead. (Source: NSA CNSA 2.0, [Post-Quantum Cybersecurity Resources](https://www.nsa.gov/Cybersecurity/Post-Quantum-Cybersecurity-Resources/))
- For firmware and software signing, use LMS or XMSS from SP 800-208 when the signer can enforce state in hardware. (Source: NIST SP 800-208 LMS and XMSS, [SP 800-208](https://csrc.nist.gov/pubs/sp/800/208/final))
- NSA prefers LMS with SHA-256/192 for software and firmware signing, and approves the other SP 800-208 parameter sets. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Implement KEM definitions, security properties, and hybrid combiners as specified in SP 800-227. (Source: NIST SP 800-227 KEMs, [SP 800-227](https://csrc.nist.gov/pubs/sp/800/227/final))
- Use AES-256 for new high-assurance symmetric encryption. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Use SHA-384 or SHA-512 for new long-lived hashes in CNSA 2.0 systems. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Keep FN-DSA (planned FIPS 206) out of production until the FIPS is final and modules are validated. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))
- Treat HQC as selected, not yet a production FIPS; wait for the final standard and validated modules. (Source: NIST IR 8545 HQC selection, [IR 8545](https://csrc.nist.gov/pubs/ir/8545/final))
- Reject pre-standard Kyber, Dilithium, and SPHINCS+ deployments; they are not interoperable with FIPS 203, 204, and 205. (Source: IETF RFC 9881, [RFC 9881](https://www.rfc-editor.org/rfc/rfc9881))

## Timelines

- Plan to deprecate quantum-vulnerable public-key algorithms around 2030 and to disallow them by 2035, using the approach in the IR 8547 draft until NIST publishes a final report. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
- Treat finite-field and elliptic-curve Diffie-Hellman and MQV, RSA key establishment, RSA signatures, ECDSA, and EdDSA as the quantum-vulnerable public-key mechanisms named for that transition. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
- Accept hybrid schemes during the migration. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
- European Member States complete the first steps, publish a national PQC roadmap, and start high- and medium-risk pilots by 31 December 2026. (Source: EU NIS Cooperation Group PQC roadmap, [EU reinforces its cybersecurity with post-quantum cryptography](https://digital-strategy.ec.europa.eu/en/news/eu-reinforces-its-cybersecurity-post-quantum-cryptography))
- Migrate European high-risk use cases by the end of 2030. (Source: EU NIS Cooperation Group PQC roadmap, [EU reinforces its cybersecurity with post-quantum cryptography](https://digital-strategy.ec.europa.eu/en/news/eu-reinforces-its-cybersecurity-post-quantum-cryptography))
- Complete the European transition for as many systems as practical by 2035. (Source: EU NIS Cooperation Group PQC roadmap, [EU reinforces its cybersecurity with post-quantum cryptography](https://digital-strategy.ec.europa.eu/en/news/eu-reinforces-its-cybersecurity-post-quantum-cryptography))
- Prefer standardised hybrid solutions for the European migration where they are suitable. (Source: European Commission Recommendation (EU) 2024/1101, [Recommendation (EU) 2024/1101](https://eur-lex.europa.eu/eli/reco/2024/1101/oj/eng))
- Complete the UK migration by 2035, with large organisations spending the first two to three years on discovery, assessment, and an initial plan. (Source: UK NCSC, [Timelines for migration to post-quantum cryptography](https://www.ncsc.gov.uk/sites/default/files/pdfs/publication/pqc-migration-timelines.pdf))
- For US national security systems, sign new software and firmware with CNSA 2.0 algorithms, and finish deployed software and firmware signatures by 2030. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- For US national security web, browser, and cloud services, support and prefer CNSA 2.0 and use it exclusively by 2033. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Phase out US national security equipment that cannot support CNSA 2.0 by 31 December 2030, and mandate CNSA 2.0 algorithms by 31 December 2031 unless an exception says otherwise. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Follow the Government of Canada roadmap in ITSM.40.001 for Canadian federal systems. (Source: Canadian Centre for Cyber Security, [ITSM.40.001](https://www.cyber.gc.ca/en/guidance/roadmap-migration-post-quantum-cryptography-government-canada-itsm40001))

## TLS and other protocols

- Deploy hybrid key agreement in TLS 1.3 before migrating authentication certificates. (Source: IETF RFC 9954, [RFC 9954](https://www.rfc-editor.org/rfc/rfc9954))
- Enable X25519MLKEM768 for public internet TLS. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
- Use SecP256r1MLKEM768 when both shares must come from FIPS-approved mechanisms and P-256 is the certified curve. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
- Use SecP384r1MLKEM1024 for high-assurance and CNSA-aligned TLS. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
- For a FIPS key derivation of X25519MLKEM768, certify the ML-KEM implementation, because the ML-KEM secret is first. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
- For a FIPS key derivation of the NIST-curve hybrids, certify the ECDH implementation, because the ECDH secret is first. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
- Build hybrids so the classical half can be removed later. (Source: UK NCSC, [Next steps in preparing for post-quantum cryptography](https://www.ncsc.gov.uk/paper/next-steps-in-preparing-for-post-quantum-cryptography))
- Run operational UK systems on final RFCs, not on Internet-Drafts. (Source: UK NCSC, [Next steps in preparing for post-quantum cryptography](https://www.ncsc.gov.uk/paper/next-steps-in-preparing-for-post-quantum-cryptography))
- Prioritise IPsec/IKEv2, SSH, QUIC, and TLS key establishment on links that carry long-lived secrets. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
- For US national security IKEv2, keep a classical establishment step where the ML-KEM-1024 public key does not fit in the unencrypted messages, and fortify it with ML-KEM-1024. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Leave pure ML-DSA authentication off public websites until the TLS signature specification is an RFC and the relevant root program allows the certificates. (Source: CA/Browser Forum Ballot SMC013, [Ballot SMC013](https://cabforum.org/2025/07/02/ballot-smc-013/))

## Certificates, keys, and hashing

- Encode ML-DSA-44, ML-DSA-65, and ML-DSA-87 in X.509 and CRLs with the RFC 9881 OIDs and with algorithm parameters absent. (Source: IETF RFC 9881, [RFC 9881](https://www.rfc-editor.org/rfc/rfc9881))
- Keep HashML-DSA out of certificates, CRLs, OCSP, and issuance. (Source: IETF RFC 9881, [RFC 9881](https://www.rfc-editor.org/rfc/rfc9881))
- Choose either pure SLH-DSA or HashSLH-DSA when the CA key is generated, and keep that mode. (Source: IETF RFC 9909, [RFC 9909](https://www.rfc-editor.org/rfc/rfc9909))
- Put ML-KEM keys only in certificates whose key usage is keyEncipherment. (Source: IETF RFC 9935, [RFC 9935](https://www.rfc-editor.org/rfc/rfc9935))
- Issue public S/MIME PQC certificates only as non-hybrid ML-DSA or ML-KEM experiments allowed by S/MIME Baseline Requirements 1.0.11, and follow any stricter root-program rule. (Source: CA/Browser Forum Ballot SMC013, [Ballot SMC013](https://cabforum.org/2025/07/02/ballot-smc-013/))
- Keep composite ML-DSA certificates in the lab until `draft-ietf-lamps-pq-composite-sigs` is published as an RFC. (Source: IETF RFC 9763, [RFC 9763](https://www.rfc-editor.org/rfc/rfc9763))
- Generate ML-KEM and ML-DSA keys inside the module that will use them. (Source: NIST FIPS 203 ML-KEM, [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final))
- Store the FIPS seed rather than the expanded private key when the module allows it. (Source: NIST FIPS 204 ML-DSA, [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final))
- Keep KEM keys and signature keys in separate objects. (Source: IETF RFC 9935, [RFC 9935](https://www.rfc-editor.org/rfc/rfc9935))
- Sign with the hedged or randomized ML-DSA procedure in FIPS 204. (Source: NIST FIPS 204 ML-DSA, [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final))
- Treat an LMS or XMSS private key as a counter: one signer, monotonic state, no reuse after backup or restore. (Source: NIST SP 800-208 LMS and XMSS, [SP 800-208](https://csrc.nist.gov/pubs/sp/800/208/final))
- Leave the hash inside ML-KEM, ML-DSA, and SLH-DSA as the FIPS specifies it. (Source: NIST FIPS 203 ML-KEM, [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final))
- For new Israeli systems, prefer longer symmetric keys such as AES-256 and SHA-512 while the PQC migration proceeds. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))

## Vaults and HSMs

- Inventory every key, certificate, protocol, library, and module, including algorithm, owner, and how long the data must stay confidential. (Source: NIST NCCoE Migration to PQC, [Migration to Post-Quantum Cryptography](https://www.nccoe.nist.gov/projects/migration-post-quantum-cryptography))
- Buy only products that identify algorithms explicitly and accept public keys and signatures of several kilobytes. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
- Require CAVP validation of FIPS 203 and FIPS 204 and a CMVP path to FIPS 140-3 before accepting a module for a regulated system. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))
- Generate and use ML-KEM and ML-DSA keys in the HSM without exporting expanded private keys by default. (Source: NIST FIPS 203 ML-KEM, [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final))
- Put LMS and XMSS signing and state management in hardware, and design backup so the counter cannot rewind. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Size APIs and stores for ML-DSA signatures of about 3 to 5 KB and for SLH-DSA signatures of tens of kilobytes. (Source: NIST FIPS 204 ML-DSA, [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final))
- Keep existing rotation, audit, and separation-of-duties controls, and wrap ML-KEM session keys with AES-256-GCM or another approved mode. (Source: NSA CNSA 2.0 FAQ, [CNSA 2.0 FAQ](https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF))
- Store an algorithm identifier with each key so the classical half of a hybrid can be retired without re-issuing every object by hand. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))

## Starting phase

- Name an owner and publish a roadmap with discovery finished, high-risk migration by 2030, and remaining migration by 2035. (Source: UK NCSC, [Timelines for migration to post-quantum cryptography](https://www.ncsc.gov.uk/sites/default/files/pdfs/publication/pqc-migration-timelines.pdf))
- Stop commissioning new systems that cannot negotiate a PQC or hybrid key establishment. (Source: European Commission Recommendation (EU) 2024/1101, [Recommendation (EU) 2024/1101](https://eur-lex.europa.eu/eli/reco/2024/1101/oj/eng))
- Pilot X25519MLKEM768 on external TLS and record handshake size and middlebox failures. (Source: Cloudflare post-quantum Internet, [State of the post-quantum Internet in 2025](https://blog.cloudflare.com/pq-2025/))
- Pilot SecP384r1MLKEM1024 only where CNSA or an equivalent high-assurance profile applies. (Source: IETF RFC 10024, [RFC 10024](https://www.rfc-editor.org/rfc/rfc10024))
- Lab-issue private ML-DSA chains under RFC 9881, and leave public web trust anchors unchanged in this phase. (Source: IETF RFC 9881, [RFC 9881](https://www.rfc-editor.org/rfc/rfc9881))
- Put crypto-agility and a PQC test requirement into supplier contracts. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
- Re-read this paper when FIPS 206, the HQC FIPS, or a final IR 8547 is published. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))

## Israel

- Map organizational cyber assets, including protocol, algorithm, key-exchange frequency, hash, and the confidentiality lifetime of data at rest, in transit, and in processing. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
- Review the risk and the operational impact of moving to quantum-resistant algorithms. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
- Review NIST cryptography publications on a repeating schedule. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
- Contractually require suppliers to ship crypto-agility, meaning advanced cryptography can be upgraded without a material product change. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
- Shorten key and session lifetimes while classical public-key algorithms remain in use. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
- Use perfect forward secrecy on existing protocols. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
- Instruct development teams to use the PQC algorithms NIST recommends at the time. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
- If QKD is assessed, include classical side channels in the review and do not treat QKD as a substitute for PQC. (Source: Israel National Cyber Directorate, [Organizational Cyber Readiness to the Post-Quantum Age, v1.85](https://www.gov.il/BlobFolder/generalpage/quantum_computing/he/Best%20Practices%20-%20Organizational%20Cyber%20Readiness%20to%20the%20Post-Quantum%20Age%20v.1.85.pdf))
- Banking corporations and licensed payment service providers raise awareness of quantum risk and keep watching PQC and QKD developments. (Source: Bank of Israel Banking Supervision, [Letter 202501, 7 January 2025](https://www.boi.org.il/en/economic-roles/supervision-and-regulation/letters/letter202501en))
- Banking corporations and licensed payment service providers map and manage encrypted information assets under Proper Conduct of Banking Business Directive 364. (Source: Bank of Israel Banking Supervision, [Letter 202501, 7 January 2025](https://www.boi.org.il/en/economic-roles/supervision-and-regulation/letters/letter202501en))
- Banking corporations and licensed payment service providers prepare staff, a test environment, and an infrastructure assessment for post-quantum encryption. (Source: Bank of Israel Banking Supervision, [Letter 202501, 7 January 2025](https://www.boi.org.il/en/economic-roles/supervision-and-regulation/letters/letter202501en))
- The board and management discuss an initial quantum preparedness plan, and the plan was due to Banking Supervision within one year of 7 January 2025. (Source: Bank of Israel Banking Supervision, [Letter 202501, 7 January 2025](https://www.boi.org.il/en/economic-roles/supervision-and-regulation/letters/letter202501en))

## European Union and national agencies

- Member States coordinate their public-sector and critical-infrastructure migration through the NIS Cooperation Group roadmap. (Source: European Commission Recommendation (EU) 2024/1101, [Recommendation (EU) 2024/1101](https://eur-lex.europa.eu/eli/reco/2024/1101/oj/eng))
- Use the ENISA April 2026 hybridisation report as a map of standards work, and treat it as technical input only: ENISA states that the report is not itself a recommendation. (Source: ENISA, [Hybridization of traditional cryptographic mechanisms with PQC, 30 April 2026](https://certification.enisa.europa.eu/document/download/02f54596-6a99-4c9e-88c4-8c711ebff9c1_en?filename=ENISA+report+-+Hybridization+of+traditional+cryptographic+mechanisms+with+PQC+-+Standardisation+Status+-+30+April+2026+.pdf))
- German regulated systems take algorithm and hybrid choices from the current BSI TR-02102-1, not from another country's parameter table. (Source: BSI Germany, [BSI](https://www.bsi.bund.de/))
- French regulated systems take algorithm choices from the current ANSSI PQC position. (Source: ANSSI France, [ANSSI](https://cyber.gouv.fr/))
- Dutch regulated systems take algorithm choices from the current NLNCSA migration guidance. (Source: NLNCSA Netherlands, [NLNCSA](https://www.nlcsa.nl/))

## United States

- Federal civilian systems follow NIST PQC standards and the IR 8547 transition approach. (Source: NIST IR 8547 transition draft, [IR 8547 initial public draft](https://csrc.nist.gov/pubs/ir/8547/ipd))
- National security systems follow CNSSP 15 and CNSA 2.0, not the general internet default of ML-KEM-768 and ML-DSA-65. (Source: NSA CNSA 2.0, [Post-Quantum Cybersecurity Resources](https://www.nsa.gov/Cybersecurity/Post-Quantum-Cybersecurity-Resources/))
- NSA does not approve quantum key distribution for protecting national security systems. (Source: NSA CNSA 2.0, [Post-Quantum Cybersecurity Resources](https://www.nsa.gov/Cybersecurity/Post-Quantum-Cybersecurity-Resources/))
- Critical infrastructure operators inventory cryptography and prioritize harvest-now-decrypt-later exposure using the joint CISA, NIST, and NSA quantum-readiness guidance. (Source: CISA, [Quantum-Readiness: Migration to Post-Quantum Cryptography](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/article/3498776/post-quantum-cryptography-cisa-nist-and-nsa-recommend-how-to-prepare-now/))
- US financial institutions track ASC X9 quantum-safe profiles in addition to NIST. (Source: ASC X9, [ASC X9](https://x9.org/))
- Cardholder-data environments follow PCI SSC cryptographic requirements as they are updated for PQC. (Source: PCI Security Standards Council, [PCI SSC](https://www.pcisecuritystandards.org/))

## United Kingdom, Canada, Australia, and Japan

- UK operational cryptography uses final NIST standards and published RFCs. (Source: UK NCSC, [Next steps in preparing for post-quantum cryptography](https://www.ncsc.gov.uk/paper/next-steps-in-preparing-for-post-quantum-cryptography))
- Canadian government systems follow ITSM.40.001. (Source: Canadian Centre for Cyber Security, [ITSM.40.001](https://www.cyber.gc.ca/en/guidance/roadmap-migration-post-quantum-cryptography-government-canada-itsm40001))
- Australian government systems follow the Australian Signals Directorate's planning guidance for post-quantum cryptography. (Source: Australian Signals Directorate, [ASD ACSC](https://www.cyber.gov.au/))
- Japanese government systems follow CRYPTREC cryptographic evaluation. (Source: CRYPTREC Japan, [CRYPTREC](https://www.cryptrec.go.jp/en.html))
- International product certifications still track ISO/IEC JTC 1/SC 27, which lags the NIST FIPS. (Source: ISO/IEC JTC 1/SC 27, [ISO/IEC JTC 1/SC 27](https://www.iso.org/committee/45306.html))
- X.509 directory and PKI changes still track ITU-T Study Group 17. (Source: ITU-T Study Group 17, [ITU-T SG17](https://www.itu.int/en/ITU-T/studygroups/2025-2028/17/Pages/default.aspx))
- Migration method, as distinct from algorithm choice, may follow ETSI TC CYBER quantum-safe migration publications. (Source: ETSI TC CYBER QSC, [ETSI](https://www.etsi.org/))

## Platform practice

- Platform practice: IBM co-developed the algorithms that became ML-KEM and ML-DSA; follow IBM Quantum Safe guidance for IBM-hosted keys, and ignore leftover Kyber-only endpoint settings. (Source: IBM Quantum Safe, [IBM Quantum Safe](https://www.ibm.com/quantum/quantum-safe))
- Platform practice: enable X25519MLKEM768 on Google Cloud load balancers; Google Cloud turns it on by default after October 2026 and requires it after October 2027. (Source: Google Cloud post-quantum TLS, [Post-quantum TLS](https://docs.cloud.google.com/load-balancing/docs/post-quantum-tls))
- Platform practice: Chrome is not adding ordinary X.509 post-quantum certificates to the public Chrome Root Store; watch the IETF PLANTS Merkle Tree Certificate work before planning public-web authentication. (Source: Cloudflare post-quantum Internet, [State of the post-quantum Internet in 2025](https://blog.cloudflare.com/pq-2025/))
- Platform practice: AWS KMS, Certificate Manager, and Secrets Manager offer ML-KEM hybrid key agreement on non-FIPS endpoints, and customers must update clients so the hybrid group is offered. (Source: AWS ML-KEM TLS, [ML-KEM post-quantum TLS now supported in AWS KMS, ACM, and Secrets Manager](https://aws.amazon.com/blogs/security/ml-kem-post-quantum-tls-now-supported-in-aws-kms-acm-and-secrets-manager/))
- Platform practice: on Windows 11 and Windows Server 2025, use the SymCrypt and CNG ML-KEM and ML-DSA APIs, and require TLS 1.3 before enabling hybrid key exchange. (Source: Microsoft quantum-safe security, [Quantum-safe security](https://www.microsoft.com/en-us/security/blog/2025/08/20/quantum-safe-security-progress-towards-next-generation-cryptography/))
- Platform practice: use Cloudflare's published client-support census to decide when X25519MLKEM768 can be required on a public site. (Source: Cloudflare post-quantum Internet, [State of the post-quantum Internet in 2025](https://blog.cloudflare.com/pq-2025/))

## Unverified this run

- NÚKIB (Czech Republic), CCN (Spain), NSM (Norway), New Zealand NCSC, Singapore CSA, and South Korean cryptographic authorities were not given their own catalog URLs on this run; use the national authority's current publication before citing a parameter set for those jurisdictions. (Source: NIST PQC project, [Post-Quantum Cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography))

export const topicsData = {
  "network-security": {
    title: "🔐 Network Security",
    description: "Protecting data during transmission over networks",
    icon: "🔐",
    color: "#667eea",
    
    sections: [
      {
        title: "What is Network Security?",
        content: "Network security involves policies, practices, and technologies designed to protect the integrity, confidentiality, and availability of computer networks and data. It defends against unauthorized access, misuse, malfunction, modification, destruction, or improper disclosure."
      },
      {
        title: "Key Components",
        subsections: [
          {
            name: "Firewalls",
            description: "Act as barriers between trusted internal networks and untrusted external networks. They filter traffic based on predefined security rules.",
            points: [
              "Packet-filtering firewalls: Filter based on IP addresses and ports",
              "Stateful firewalls: Track connection states",
              "Application firewalls: Inspect application-layer data",
              "Next-gen firewalls: Combine multiple security features"
            ]
          },
          {
            name: "VPNs (Virtual Private Networks)",
            description: "Create secure, encrypted connections over public networks, allowing remote users to access private networks securely.",
            points: [
              "Encrypts data in transit",
              "Hides IP addresses",
              "Common protocols: OpenVPN, IPSec, WireGuard",
              "Use cases: Remote work, privacy, geo-restriction bypass"
            ]
          },
          {
            name: "IDS/IPS",
            description: "Intrusion Detection Systems (IDS) monitor network traffic for suspicious activity. Intrusion Prevention Systems (IPS) can actively block threats.",
            points: [
              "Signature-based detection: Matches known attack patterns",
              "Anomaly-based detection: Identifies unusual behavior",
              "IDS alerts administrators, IPS takes automatic action",
              "Examples: Snort, Suricata, Zeek"
            ]
          },
          {
            name: "Zero Trust Architecture",
            description: "Security model that assumes no user or device should be trusted by default, even inside the network perimeter.",
            points: [
              "Verify explicitly: Always authenticate and authorize",
              "Least privilege access: Minimal access rights",
              "Assume breach: Limit blast radius",
              "Continuous monitoring and validation"
            ]
          }
        ]
      },
      {
        title: "Common Threats",
        list: [
          "Man-in-the-Middle (MitM) attacks",
          "Denial of Service (DoS/DDoS)",
          "Packet sniffing",
          "Port scanning",
          "SQL injection through network",
          "Session hijacking"
        ]
      },
      {
        title: "Best Practices",
        list: [
          "Implement network segmentation",
          "Use strong encryption (TLS 1.3, AES-256)",
          "Regular security audits and penetration testing",
          "Keep systems and firmware updated",
          "Monitor network traffic continuously",
          "Implement multi-factor authentication",
          "Use security information and event management (SIEM)"
        ]
      },
      {
        title: "Tools & Technologies",
        tools: [
          { name: "Wireshark", description: "Network protocol analyzer" },
          { name: "Nmap", description: "Network discovery and security auditing" },
          { name: "pfSense", description: "Open-source firewall" },
          { name: "Cisco ASA", description: "Enterprise firewall solution" },
          { name: "Snort", description: "Intrusion detection system" }
        ]
      }
    ],
    
    resources: [
      { title: "CompTIA Security+ Study Guide", url: "https://www.comptia.org/certifications/security" },
      { title: "SANS Network Security", url: "https://www.sans.org/cyber-security-courses/network-security/" },
      { title: "Cisco Network Security", url: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html" }
    ]
  },

  "application-security": {
    title: "🛡️ Application Security",
    description: "Securing software applications from threats",
    icon: "🛡️",
    color: "#764ba2",
    
    sections: [
      {
        title: "What is Application Security?",
        content: "Application security focuses on keeping software applications free from threats throughout their lifecycle. It involves finding, fixing, and preventing security vulnerabilities in applications."
      },
      {
        title: "Key Concepts",
        subsections: [
          {
            name: "Secure Coding",
            description: "Writing code with security in mind from the start.",
            points: [
              "Input validation and sanitization",
              "Output encoding to prevent XSS",
              "Parameterized queries to prevent SQL injection",
              "Proper error handling (don't expose sensitive info)",
              "Secure session management",
              "Use of security libraries and frameworks"
            ]
          },
          {
            name: "OWASP Top 10",
            description: "The most critical web application security risks.",
            points: [
              "A01: Broken Access Control",
              "A02: Cryptographic Failures",
              "A03: Injection (SQL, NoSQL, OS command)",
              "A04: Insecure Design",
              "A05: Security Misconfiguration",
              "A06: Vulnerable and Outdated Components",
              "A07: Identification and Authentication Failures",
              "A08: Software and Data Integrity Failures",
              "A09: Security Logging and Monitoring Failures",
              "A10: Server-Side Request Forgery (SSRF)"
            ]
          },
          {
            name: "SAST/DAST Tools",
            description: "Automated security testing approaches.",
            points: [
              "SAST (Static): Analyzes source code without execution",
              "DAST (Dynamic): Tests running applications",
              "IAST (Interactive): Combines SAST and DAST",
              "Tools: SonarQube, Checkmarx, Burp Suite, OWASP ZAP"
            ]
          },
          {
            name: "DevSecOps",
            description: "Integrating security into DevOps practices.",
            points: [
              "Shift-left security: Test early and often",
              "Automated security testing in CI/CD",
              "Infrastructure as Code (IaC) security scanning",
              "Container security scanning",
              "Continuous monitoring and feedback"
            ]
          }
        ]
      },
      {
        title: "Common Vulnerabilities",
        list: [
          "SQL Injection",
          "Cross-Site Scripting (XSS)",
          "Cross-Site Request Forgery (CSRF)",
          "Insecure Direct Object References",
          "Security Misconfiguration",
          "Sensitive Data Exposure",
          "Broken Authentication"
        ]
      },
      {
        title: "Best Practices",
        list: [
          "Follow secure coding guidelines (OWASP, CERT)",
          "Implement least privilege principle",
          "Use Content Security Policy (CSP)",
          "Enable HTTPS everywhere",
          "Regular dependency updates",
          "Code reviews with security focus",
          "Penetration testing before deployment"
        ]
      }
    ],
    
    resources: [
      { title: "OWASP Official Site", url: "https://owasp.org/" },
      { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" },
      { title: "SANS Secure Coding", url: "https://www.sans.org/cyber-security-courses/secure-coding/" }
    ]
  },

  "information-security": {
    title: "🗃️ Information Security (InfoSec)",
    description: "Protecting information's confidentiality, integrity, and availability",
    icon: "🗃️",
    color: "#10b981",
    
    sections: [
      {
        title: "The CIA Triad",
        content: "The foundation of information security based on three core principles:",
        subsections: [
          {
            name: "Confidentiality",
            description: "Ensuring information is accessible only to authorized parties.",
            points: [
              "Encryption at rest and in transit",
              "Access controls and permissions",
              "Data classification (public, internal, confidential, restricted)",
              "Need-to-know principle"
            ]
          },
          {
            name: "Integrity",
            description: "Maintaining accuracy and completeness of data.",
            points: [
              "Hash functions (SHA-256, SHA-3)",
              "Digital signatures",
              "Version control",
              "Checksums and data validation"
            ]
          },
          {
            name: "Availability",
            description: "Ensuring authorized users have reliable access to information.",
            points: [
              "Redundancy and failover systems",
              "Regular backups (3-2-1 rule)",
              "DDoS protection",
              "Disaster recovery plans"
            ]
          }
        ]
      },
      {
        title: "Data Classification",
        content: "Categorizing data based on sensitivity and impact if compromised.",
        list: [
          "Public: No impact if disclosed",
          "Internal: Limited impact, for internal use only",
          "Confidential: Significant impact, restricted access",
          "Restricted: Severe impact, highly restricted (PII, PHI, trade secrets)"
        ]
      },
      {
        title: "Encryption Methods",
        subsections: [
          {
            name: "Symmetric Encryption",
            description: "Same key for encryption and decryption.",
            points: ["AES (Advanced Encryption Standard)", "Fast but requires secure key exchange", "Used for: File encryption, disk encryption"]
          },
          {
            name: "Asymmetric Encryption",
            description: "Public/private key pairs.",
            points: ["RSA, ECC (Elliptic Curve)", "Slower but no need for shared secrets", "Used for: Digital signatures, key exchange, SSL/TLS"]
          }
        ]
      },
      {
        title: "ISO/IEC 27001",
        content: "International standard for information security management systems (ISMS). Provides a framework for managing and protecting sensitive information.",
        points: [
          "Risk assessment and treatment",
          "Security policies and procedures",
          "Asset management",
          "Access control",
          "Cryptography",
          "Physical security",
          "Incident management"
        ]
      }
    ],
    
    resources: [
      { title: "ISO 27001 Standard", url: "https://www.iso.org/isoiec-27001-information-security.html" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
      { title: "SANS InfoSec Resources", url: "https://www.sans.org/information-security/" }
    ]
  },

  "pentesting": {
    title: "🧪 Penetration Testing & Ethical Hacking",
    description: "Simulating cyberattacks to find vulnerabilities",
    icon: "🧪",
    color: "#ef4444",
    
    sections: [
      {
        title: "What is Penetration Testing?",
        content: "Authorized simulated cyberattacks performed to evaluate the security of a system. Ethical hackers use the same tools and techniques as malicious hackers, but with permission and for defensive purposes."
      },
      {
        title: "Phases of Penetration Testing",
        subsections: [
          {
            name: "1. Reconnaissance",
            description: "Information gathering about the target.",
            points: [
              "Passive recon: OSINT, social media, public records",
              "Active recon: Port scanning, network mapping",
              "Tools: Nmap, Shodan, theHarvester, Maltego"
            ]
          },
          {
            name: "2. Scanning",
            description: "Identifying open ports, services, and vulnerabilities.",
            points: [
              "Port scanning (TCP/UDP)",
              "Vulnerability scanning",
              "Tools: Nmap, Nessus, OpenVAS"
            ]
          },
          {
            name: "3. Gaining Access",
            description: "Exploiting vulnerabilities to gain unauthorized access.",
            points: [
              "Exploit frameworks: Metasploit",
              "Password attacks: Hydra, John the Ripper",
              "Social engineering",
              "Web app exploitation: SQL injection, XSS"
            ]
          },
          {
            name: "4. Maintaining Access",
            description: "Establishing persistent access to the system.",
            points: [
              "Backdoors and rootkits",
              "Privilege escalation",
              "Lateral movement"
            ]
          },
          {
            name: "5. Covering Tracks",
            description: "Removing evidence of intrusion.",
            points: [
              "Log manipulation",
              "File deletion",
              "Timestamp modification"
            ]
          }
        ]
      },
      {
        title: "Essential Tools",
        tools: [
          { name: "Kali Linux", description: "Penetration testing distribution with 600+ tools" },
          { name: "Metasploit", description: "Exploit framework for developing and executing exploits" },
          { name: "Burp Suite", description: "Web application security testing platform" },
          { name: "Wireshark", description: "Network protocol analyzer" },
          { name: "Nmap", description: "Network discovery and security auditing" },
          { name: "John the Ripper", description: "Password cracking tool" },
          { name: "Aircrack-ng", description: "Wireless network security tools" }
        ]
      },
      {
        title: "Types of Penetration Testing",
        list: [
          "Black Box: No prior knowledge of the system",
          "White Box: Full knowledge and access",
          "Gray Box: Partial knowledge",
          "Network Pentesting: Testing network infrastructure",
          "Web App Pentesting: Testing web applications",
          "Mobile App Pentesting: Testing iOS/Android apps",
          "Social Engineering: Testing human vulnerabilities",
          "Red Teaming: Full-scope simulated attack"
        ]
      },
      {
        title: "Ethical Considerations",
        list: [
          "Always get written permission before testing",
          "Stay within the scope of engagement",
          "Protect client data and findings",
          "Follow responsible disclosure practices",
          "Obtain proper certifications (CEH, OSCP, GPEN)"
        ]
      }
    ],
    
    resources: [
      { title: "Hack The Box", url: "https://www.hackthebox.com/" },
      { title: "TryHackMe", url: "https://tryhackme.com/" },
      { title: "OWASP WebGoat", url: "https://owasp.org/www-project-webgoat/" },
      { title: "Offensive Security (OSCP)", url: "https://www.offensive-security.com/" }
    ]
  },

  "grc": {
    title: "📜 Security Governance, Risk & Compliance (GRC)",
    description: "Managing organizational risk, compliance, and policies",
    icon: "📜",
    color: "#f59e0b",
    
    sections: [
      {
        title: "What is GRC?",
        content: "GRC is an integrated approach to managing governance, risk management, and compliance across an organization. It ensures that security efforts align with business objectives and regulatory requirements."
      },
      {
        title: "Key Components",
        subsections: [
          {
            name: "Governance",
            description: "Establishing policies, procedures, and controls.",
            points: [
              "Security policies and standards",
              "Roles and responsibilities",
              "Decision-making frameworks",
              "Board-level oversight"
            ]
          },
          {
            name: "Risk Management",
            description: "Identifying, assessing, and mitigating risks.",
            points: [
              "Risk assessment methodologies (qualitative/quantitative)",
              "Risk registers and heat maps",
              "Risk treatment: Accept, Mitigate, Transfer, Avoid",
              "Continuous risk monitoring"
            ]
          },
          {
            name: "Compliance",
            description: "Adhering to laws, regulations, and standards.",
            points: [
              "Regulatory compliance programs",
              "Audit preparation and response",
              "Evidence collection and documentation",
              "Continuous compliance monitoring"
            ]
          }
        ]
      },
      {
        title: "Major Compliance Frameworks",
        subsections: [
          {
            name: "SOC 2",
            description: "Service Organization Control 2: Framework for service providers handling customer data.",
            points: ["Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, Privacy"]
          },
          {
            name: "HIPAA",
            description: "Health Insurance Portability and Accountability Act: Protects patient health information.",
            points: ["Applies to healthcare providers, insurers, clearinghouses", "Technical, physical, and administrative safeguards"]
          },
          {
            name: "GDPR",
            description: "General Data Protection Regulation: EU data protection law.",
            points: ["Data subject rights", "Consent requirements", "Data breach notification", "Privacy by design"]
          },
          {
            name: "PCI-DSS",
            description: "Payment Card Industry Data Security Standard: Protects cardholder data.",
            points: ["12 requirements across 6 goals", "Applies to any organization handling card payments"]
          },
          {
            name: "NIST Frameworks",
            description: "National Institute of Standards and Technology frameworks.",
            points: ["NIST CSF: Cybersecurity Framework", "NIST 800-53: Security controls", "NIST 800-171: Protecting CUI"]
          }
        ]
      },
      {
        title: "Risk Assessment Process",
        steps: [
          "Identify assets and threats",
          "Assess vulnerabilities",
          "Determine likelihood and impact",
          "Calculate risk level",
          "Prioritize risks",
          "Implement controls",
          "Monitor and review"
        ]
      }
    ],
    
    resources: [
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
      { title: "ISO 27001 Toolkit", url: "https://www.iso27001security.com/" },
      { title: "SANS GRC Resources", url: "https://www.sans.org/cyber-security-courses/governance-risk-compliance/" }
    ]
  },

  "endpoint-security": {
    title: "🖥️ Endpoint Security",
    description: "Securing user devices like laptops and mobile phones",
    icon: "🖥️",
    color: "#8b5cf6",
    
    sections: [
      {
        title: "What is Endpoint Security?",
        content: "Endpoint security protects end-user devices (desktops, laptops, mobile devices, servers) from malicious actors and exploits. With remote work increasing, securing endpoints is critical."
      },
      {
        title: "Key Technologies",
        subsections: [
          {
            name: "Antivirus & Anti-Malware",
            description: "Traditional signature-based protection.",
            points: [
              "Signature detection: Matches known malware patterns",
              "Heuristic analysis: Identifies suspicious behavior",
              "Real-time scanning",
              "Examples: Windows Defender, Norton, Kaspersky"
            ]
          },
          {
            name: "EDR (Endpoint Detection & Response)",
            description: "Advanced threat detection and investigation.",
            points: [
              "Continuous monitoring and data collection",
              "Behavioral analysis and anomaly detection",
              "Automated threat response",
              "Forensic investigation capabilities",
              "Examples: CrowdStrike Falcon, Carbon Black, SentinelOne"
            ]
          },
          {
            name: "MDM (Mobile Device Management)",
            description: "Managing and securing mobile devices.",
            points: [
              "Device enrollment and configuration",
              "App management and distribution",
              "Remote wipe capabilities",
              "Policy enforcement (passwords, encryption)",
              "Examples: Microsoft Intune, VMware Workspace ONE"
            ]
          },
          {
            name: "Patch Management",
            description: "Keeping systems up-to-date with security patches.",
            points: [
              "Automated patch deployment",
              "Vulnerability scanning",
              "Patch testing before deployment",
              "Rollback capabilities",
              "Tools: WSUS, SCCM, Ivanti"
            ]
          }
        ]
      },
      {
        title: "Common Endpoint Threats",
        list: [
          "Malware (viruses, trojans, worms)",
          "Ransomware",
          "Spyware and adware",
          "Phishing attacks",
          "Zero-day exploits",
          "Insider threats",
          "Lost or stolen devices"
        ]
      },
      {
        title: "Best Practices",
        list: [
          "Implement full disk encryption",
          "Enforce strong passwords and MFA",
          "Regular security awareness training",
          "Principle of least privilege",
          "Application whitelisting",
          "Regular backups",
          "Network access control (NAC)",
          "Zero Trust endpoint security"
        ]
      }
    ],
    
    resources: [
      { title: "NIST Endpoint Security Guide", url: "https://csrc.nist.gov/" },
      { title: "Microsoft Endpoint Security", url: "https://www.microsoft.com/en-us/security/business/endpoint-security" },
      { title: "SANS Endpoint Protection", url: "https://www.sans.org/" }
    ]
  },
  // Add these to the topicsData object in src/data/topicsData.js

"cloud-security": {
  title: "☁️ Cloud Security",
  description: "Protecting cloud infrastructure and services",
  icon: "☁️",
  color: "#3b82f6",
  
  sections: [
    {
      title: "What is Cloud Security?",
      content: "Cloud security encompasses the technologies, policies, and controls deployed to protect data, applications, and infrastructure in cloud computing environments (AWS, Azure, GCP)."
    },
    {
      title: "Key Concepts",
      subsections: [
        {
          name: "Shared Responsibility Model",
          description: "Understanding security responsibilities between cloud provider and customer.",
          points: [
            "Provider: Security OF the cloud (infrastructure, hardware)",
            "Customer: Security IN the cloud (data, applications, access)",
            "Varies by service model: IaaS, PaaS, SaaS"
          ]
        },
        {
          name: "IAM (Identity & Access Management)",
          description: "Managing who can access what resources.",
          points: [
            "Principle of least privilege",
            "Role-Based Access Control (RBAC)",
            "Multi-Factor Authentication (MFA)",
            "Service accounts and API keys",
            "AWS IAM, Azure AD, GCP IAM"
          ]
        },
        {
          name: "CSPM (Cloud Security Posture Management)",
          description: "Continuous monitoring of cloud security configurations.",
          points: [
            "Detects misconfigurations",
            "Compliance monitoring",
            "Security best practices enforcement",
            "Tools: Prisma Cloud, AWS Security Hub, Azure Security Center"
          ]
        },
        {
          name: "Workload Security",
          description: "Protecting compute instances and containers.",
          points: [
            "VM security and hardening",
            "Container security scanning",
            "Kubernetes security",
            "Serverless security (Lambda, Azure Functions)"
          ]
        }
      ]
    },
    {
      title: "Common Cloud Threats",
      list: [
        "Misconfigured S3 buckets (data exposure)",
        "Weak IAM policies",
        "Lack of encryption",
        "Insufficient logging and monitoring",
        "Account hijacking",
        "Insecure APIs",
        "DDoS attacks"
      ]
    },
    {
      title: "Best Practices",
      list: [
        "Enable MFA on all accounts",
        "Encrypt data at rest and in transit",
        "Use VPCs and network segmentation",
        "Enable CloudTrail/CloudWatch logging",
        "Regular security audits",
        "Implement least privilege access",
        "Use infrastructure as code (IaC) with security scanning"
      ]
    },
    {
      title: "Key Services by Provider",
      subsections: [
        {
          name: "AWS Security Services",
          points: [
            "AWS IAM - Identity management",
            "AWS GuardDuty - Threat detection",
            "AWS Security Hub - Security posture",
            "AWS KMS - Key management",
            "AWS Shield - DDoS protection"
          ]
        },
        {
          name: "Azure Security Services",
          points: [
            "Azure Active Directory - Identity",
            "Azure Security Center - Unified security",
            "Azure Sentinel - SIEM",
            "Azure Key Vault - Secret management",
            "Azure DDoS Protection"
          ]
        },
        {
          name: "GCP Security Services",
          points: [
            "Cloud Identity - Identity management",
            "Security Command Center - Security insights",
            "Cloud KMS - Key management",
            "Cloud Armor - DDoS and WAF",
            "VPC Service Controls"
          ]
        }
      ]
    }
  ],
  
  resources: [
    { title: "AWS Security Best Practices", url: "https://aws.amazon.com/security/" },
    { title: "Azure Security Documentation", url: "https://docs.microsoft.com/en-us/azure/security/" },
    { title: "GCP Security Overview", url: "https://cloud.google.com/security" }
  ]
},

"soc-ir": {
  title: "🚨 Security Operations (SOC) & Incident Response",
  description: "Monitoring and responding to threats and incidents",
  icon: "🚨",
  color: "#dc2626",
  
  sections: [
    {
      title: "What is a SOC?",
      content: "A Security Operations Center (SOC) is a centralized unit that monitors, detects, analyzes, and responds to cybersecurity incidents using a combination of people, processes, and technology."
    },
    {
      title: "SOC Functions",
      subsections: [
        {
          name: "Monitoring",
          description: "24/7 surveillance of security events.",
          points: [
            "Real-time monitoring of logs and alerts",
            "Network traffic analysis",
            "Endpoint monitoring",
            "User behavior analytics (UBA)"
          ]
        },
        {
          name: "Threat Detection",
          description: "Identifying potential security incidents.",
          points: [
            "SIEM correlation rules",
            "Threat intelligence integration",
            "Anomaly detection",
            "IOC (Indicators of Compromise) matching"
          ]
        },
        {
          name: "Incident Response",
          description: "Responding to confirmed security incidents.",
          points: [
            "Containment and eradication",
            "Forensic investigation",
            "Recovery and restoration",
            "Post-incident analysis"
          ]
        },
        {
          name: "Threat Hunting",
          description: "Proactively searching for threats.",
          points: [
            "Hypothesis-driven hunting",
            "Baseline analysis",
            "Advanced threat detection",
            "Leveraging threat intelligence"
          ]
        }
      ]
    },
    {
      title: "SIEM Platforms",
      tools: [
        { name: "Splunk", description: "Industry-leading SIEM with powerful analytics" },
        { name: "IBM QRadar", description: "Enterprise SIEM with AI-powered detection" },
        { name: "Microsoft Sentinel", description: "Cloud-native SIEM and SOAR" },
        { name: "Elastic Security", description: "Open-source SIEM built on Elastic Stack" },
        { name: "LogRhythm", description: "SIEM with built-in automation" }
      ]
    },
    {
      title: "Incident Response Lifecycle",
      subsections: [
        {
          name: "1. Preparation",
          points: [
            "Develop IR plan and playbooks",
            "Build IR team and assign roles",
            "Set up tools and infrastructure",
            "Conduct training and drills"
          ]
        },
        {
          name: "2. Detection & Analysis",
          points: [
            "Identify potential incidents",
            "Triage and prioritize alerts",
            "Collect and analyze evidence",
            "Determine scope and impact"
          ]
        },
        {
          name: "3. Containment",
          points: [
            "Short-term containment (isolate affected systems)",
            "Long-term containment (apply patches, change credentials)",
            "Evidence preservation"
          ]
        },
        {
          name: "4. Eradication",
          points: [
            "Remove malware and backdoors",
            "Close vulnerabilities",
            "Strengthen defenses"
          ]
        },
        {
          name: "5. Recovery",
          points: [
            "Restore systems from clean backups",
            "Return to normal operations",
            "Enhanced monitoring"
          ]
        },
        {
          name: "6. Lessons Learned",
          points: [
            "Post-incident review",
            "Update playbooks",
            "Implement improvements",
            "Report to stakeholders"
          ]
        }
      ]
    },
    {
      title: "SOC Metrics",
      list: [
        "Mean Time to Detect (MTTD)",
        "Mean Time to Respond (MTTR)",
        "Number of incidents detected",
        "False positive rate",
        "Alert volume",
        "Incident severity distribution"
      ]
    }
  ],
  
  resources: [
    { title: "NIST Incident Response Guide", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" },
    { title: "SANS Incident Response", url: "https://www.sans.org/cyber-security-courses/incident-response/" },
    { title: "MITRE ATT&CK Framework", url: "https://attack.mitre.org/" }
  ]
},

"cryptography": {
  title: "🧬 Cryptography",
  description: "Securing data using mathematical techniques",
  icon: "🧬",
  color: "#ec4899",
  
  sections: [
    {
      title: "What is Cryptography?",
      content: "Cryptography is the practice of securing communication and data using mathematical algorithms. It ensures confidentiality, integrity, authentication, and non-repudiation."
    },
    {
      title: "Core Concepts",
      subsections: [
        {
          name: "Symmetric Encryption",
          description: "Same key used for encryption and decryption.",
          points: [
            "Fast and efficient",
            "Requires secure key exchange",
            "Algorithms: AES, DES (deprecated), 3DES, ChaCha20",
            "Used for: Bulk data encryption, disk encryption",
            "AES-256 is current standard"
          ]
        },
        {
          name: "Asymmetric Encryption",
          description: "Uses public/private key pairs.",
          points: [
            "Public key encrypts, private key decrypts",
            "Slower than symmetric",
            "Algorithms: RSA, ECC (Elliptic Curve), DSA",
            "Used for: Key exchange, digital signatures, SSL/TLS",
            "No need to share secret keys"
          ]
        },
        {
          name: "Hashing",
          description: "One-way function producing fixed-size output.",
          points: [
            "Cannot be reversed",
            "Same input always produces same hash",
            "Algorithms: SHA-256, SHA-3, bcrypt, Argon2",
            "Used for: Password storage, data integrity",
            "Avoid: MD5, SHA-1 (broken)"
          ]
        },
        {
          name: "Digital Signatures",
          description: "Proves authenticity and integrity of a message.",
          points: [
            "Sender signs with private key",
            "Anyone can verify with public key",
            "Provides non-repudiation",
            "Used in: Code signing, document signing"
          ]
        }
      ]
    },
    {
      title: "Public Key Infrastructure (PKI)",
      content: "Framework for managing digital certificates and public-key encryption.",
      subsections: [
        {
          name: "Components",
          points: [
            "Certificate Authority (CA): Issues certificates",
            "Registration Authority (RA): Verifies identities",
            "Certificate Repository: Stores certificates",
            "Certificate Revocation List (CRL): Lists revoked certs"
          ]
        },
        {
          name: "X.509 Certificates",
          points: [
            "Standard format for digital certificates",
            "Contains: Public key, owner info, CA signature",
            "Used in: HTTPS, email encryption (S/MIME), VPNs"
          ]
        }
      ]
    },
    {
      title: "Common Protocols",
      subsections: [
        {
          name: "TLS/SSL",
          description: "Secures internet communications.",
          points: [
            "TLS 1.3 is current standard",
            "Uses hybrid encryption (asymmetric + symmetric)",
            "Provides: Encryption, authentication, integrity"
          ]
        },
        {
          name: "SSH",
          description: "Secure remote access protocol.",
          points: [
            "Port 22",
            "Key-based authentication preferred",
            "Used for: Remote server management, SFTP"
          ]
        },
        {
          name: "PGP/GPG",
          description: "Email and file encryption.",
          points: [
            "End-to-end encryption",
            "Web of trust model",
            "Used for: Secure email, file signing"
          ]
        }
      ]
    },
    {
      title: "Best Practices",
      list: [
        "Use strong, modern algorithms (AES-256, RSA-2048+, SHA-256+)",
        "Never implement your own crypto",
        "Use established libraries (OpenSSL, NaCl, libsodium)",
        "Store passwords with salted hashes (bcrypt, Argon2)",
        "Use random IVs for each encryption",
        "Rotate keys regularly",
        "Secure key management (HSM, key vaults)"
      ]
    }
  ],
  
  resources: [
    { title: "Crypto 101", url: "https://www.crypto101.io/" },
    { title: "Applied Cryptography", url: "https://www.schneier.com/books/applied-cryptography/" },
    { title: "Cryptography Course (Coursera)", url: "https://www.coursera.org/learn/crypto" }
  ]
},

"iam": {
  title: "🔧 Identity & Access Management (IAM)",
  description: "Managing users and their permissions securely",
  icon: "🔧",
  color: "#06b6d4",
  
  sections: [
    {
      title: "What is IAM?",
      content: "Identity and Access Management is a framework of policies and technologies ensuring the right individuals access the right resources at the right times for the right reasons."
    },
    {
      title: "Core Components",
      subsections: [
        {
          name: "Authentication",
          description: "Verifying who you are.",
          points: [
            "Something you know (password)",
            "Something you have (token, phone)",
            "Something you are (biometrics)",
            "Somewhere you are (geolocation)"
          ]
        },
        {
          name: "Authorization",
          description: "Determining what you can access.",
          points: [
            "RBAC (Role-Based Access Control)",
            "ABAC (Attribute-Based Access Control)",
            "MAC (Mandatory Access Control)",
            "DAC (Discretionary Access Control)"
          ]
        },
        {
          name: "Multi-Factor Authentication (MFA)",
          description: "Requires two or more verification factors.",
          points: [
            "SMS codes (least secure)",
            "Authenticator apps (TOTP): Google Authenticator, Authy",
            "Hardware tokens: YubiKey, RSA SecurID",
            "Push notifications",
            "Biometrics"
          ]
        },
        {
          name: "Single Sign-On (SSO)",
          description: "One login for multiple applications.",
          points: [
            "Protocols: SAML, OAuth 2.0, OpenID Connect",
            "Reduces password fatigue",
            "Centralized access control",
            "Examples: Okta, Azure AD, OneLogin"
          ]
        }
      ]
    },
    {
      title: "Access Control Models",
      subsections: [
        {
          name: "RBAC (Role-Based Access Control)",
          points: [
            "Users assigned to roles",
            "Roles have permissions",
            "Easier to manage at scale",
            "Example: Admin, Manager, User roles"
          ]
        },
        {
          name: "ABAC (Attribute-Based Access Control)",
          points: [
            "Access based on attributes (user, resource, environment)",
            "More flexible than RBAC",
            "Example: Allow if department=Finance AND time=business_hours"
          ]
        }
      ]
    },
    {
      title: "Directory Services",
      subsections: [
        {
          name: "LDAP (Lightweight Directory Access Protocol)",
          points: [
            "Centralized user directory",
            "Hierarchical structure",
            "Common in enterprises",
            "Examples: Active Directory, OpenLDAP"
          ]
        },
        {
          name: "Identity Federation",
          points: [
            "Share identities across organizations",
            "Enables SSO across domains",
            "Standards: SAML, OAuth, OpenID Connect"
          ]
        }
      ]
    },
    {
      title: "Best Practices",
      list: [
        "Enforce MFA for all users",
        "Implement least privilege access",
        "Regular access reviews and audits",
        "Automated provisioning/deprovisioning",
        "Password policies (length > complexity)",
        "Use password managers",
        "Just-in-time (JIT) access",
        "Privileged access management (PAM)"
      ]
    }
  ],
  
  resources: [
    { title: "NIST Digital Identity Guidelines", url: "https://pages.nist.gov/800-63-3/" },
    { title: "OAuth 2.0 Simplified", url: "https://www.oauth.com/" },
    { title: "Okta Identity 101", url: "https://www.okta.com/identity-101/" }
  ]
},
  "forensics": {
    title: "📊 Digital Forensics & Malware Analysis",
    description: "Investigating cybercrime incidents and understanding how malware behaves.",
    icon: "📊",
    color: "#06b6d4",

    sections: [
      {
        title: "What is Digital Forensics?",
        content:
          "Digital forensics focuses on identifying, preserving, analyzing, and presenting digital evidence from computers, networks, and mobile devices."
      },
      {
        title: "Key Forensics Areas",
        subsections: [
          {
            name: "Disk Forensics",
            description: "Recovering and analyzing data from storage media.",
            points: [
              "Acquiring forensic images using write blockers",
              "Recovering deleted files and partitions",
              "Analyzing file systems (NTFS, FAT, ext4)",
              "Identifying hidden or encrypted containers"
            ]
          },
          {
            name: "Memory Forensics",
            description: "Analyzing live memory (RAM) for volatile evidence.",
            points: [
              "Capturing memory dumps from compromised systems",
              "Finding malicious processes and injected code",
              "Extracting credentials and keys left in memory",
              "Tools: Volatility, Rekall"
            ]
          },
          {
            name: "Network Forensics",
            description: "Reconstructing events from captured network traffic.",
            points: [
              "Reviewing PCAPs for suspicious connections",
              "Rebuilding files and sessions from traffic",
              "Correlating logs from firewalls, IDS, and proxies",
              "Detecting command‑and‑control channels"
            ]
          }
        ]
      },
      {
        title: "Malware Analysis Basics",
        subsections: [
          {
            name: "Static Analysis",
            description: "Understanding malware without executing it.",
            points: [
              "Checking file hashes and signatures",
              "Inspecting strings and resources",
              "Reviewing imports and PE headers",
              "Using sandboxes to get quick high‑level behavior"
            ]
          },
          {
            name: "Dynamic Analysis",
            description: "Observing malware behavior in a safe environment.",
            points: [
              "Running samples in isolated VMs",
              "Monitoring processes, registry, and file changes",
              "Capturing network traffic to see callbacks",
              "Logging persistence and privilege escalation attempts"
            ]
          }
        ]
      },
      {
        title: "Tools & Technologies",
        tools: [
          { name: "Volatility", description: "Framework for memory forensics" },
          { name: "Autopsy/The Sleuth Kit", description: "Open‑source disk forensics platform" },
          { name: "Ghidra / IDA", description: "Reverse‑engineering and disassembly tools" },
          { name: "VirusTotal", description: "Multi‑engine malware scanning and intelligence" }
        ]
      }
    ],

    resources: [
      { title: "SANS FOR508: Digital Forensics", url: "https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting-and-digital-forensics/" },
      { title: "Volatility Framework Docs", url: "https://volatilityfoundation.org/" }
    ]
  },

  "cti": {
    title: "🤖 Cyber Threat Intelligence (CTI)",
    description: "Studying adversaries and turning threat data into actionable defense.",
    icon: "🤖",
    color: "#f97316",

    sections: [
      {
        title: "What is CTI?",
        content:
          "Cyber Threat Intelligence is the collection, analysis, and sharing of information about adversaries, their capabilities, infrastructure, and tactics."
      },
      {
        title: "Intelligence Types",
        subsections: [
          {
            name: "Strategic Intelligence",
            description: "High‑level insights for executives and risk teams.",
            points: [
              "Focus on trends, motivations, and business impact",
              "Supports long‑term security investments",
              "Often presented as reports and dashboards"
            ]
          },
          {
            name: "Operational Intelligence",
            description: "Details about specific campaigns and threat actors.",
            points: [
              "Describes adversary TTPs using frameworks like MITRE ATT&CK",
              "Supports incident response playbooks",
              "Links intrusions to known groups"
            ]
          },
          {
            name: "Tactical / Technical Intelligence",
            description: "Indicators of Compromise and low‑level data.",
            points: [
              "IP addresses, domains, file hashes, URLs",
              "YARA and Sigma rules used for detection",
              "Feeds integrated into SIEM, EDR, firewalls"
            ]
          }
        ]
      },
      {
        title: "CTI in Daily Security Operations",
        list: [
          "Enriching SIEM alerts with context about known threats",
          "Prioritizing vulnerabilities based on active exploitation",
          "Helping SOC analysts quickly identify real incidents",
          "Feeding blocklists and detection rules"
        ]
      }
    ],

    resources: [
      { title: "MITRE ATT&CK Framework", url: "https://attack.mitre.org/" },
      { title: "Recorded Future Blog on CTI", url: "https://www.recordedfuture.com/resources" }
    ]
  },

  "architecture": {
    title: "🏗️ Security Architecture & Engineering",
    description: "Designing secure systems, networks, and platforms.",
    icon: "🏗️",
    color: "#22c55e",

    sections: [
      {
        title: "Role of Security Architecture",
        content:
          "Security architects design how controls, networks, and applications fit together to reduce risk while supporting business needs."
      },
      {
        title: "Core Concepts",
        subsections: [
          {
            name: "Secure Design Principles",
            description: "Foundational ideas used when building systems.",
            points: [
              "Least privilege and need‑to‑know access",
              "Defense in depth with multiple layers of control",
              "Fail‑secure defaults and secure by design",
              "Separation of duties and strong auditing"
            ]
          },
          {
            name: "Network Segmentation",
            description: "Limiting how far attackers can move inside a network.",
            points: [
              "Separating user, server, and admin networks",
              "Placing critical assets in protected zones",
              "Using firewalls and micro‑segmentation",
              "Limiting east‑west traffic"
            ]
          },
          {
            name: "Threat Modeling",
            description: "Systematically identifying and prioritizing threats.",
            points: [
              "Understanding assets and trust boundaries",
              "Using frameworks like STRIDE or PASTA",
              "Designing mitigations early in the lifecycle"
            ]
          }
        ]
      }
    ],

    resources: [
      { title: "Microsoft STRIDE Threat Modeling", url: "https://learn.microsoft.com/azure/security/fundamentals/threat-modeling" }
    ]
  },

  "awareness": {
    title: "👨‍🏫 Awareness & Training",
    description: "Educating people so they become a strong security layer.",
    icon: "👨‍🏫",
    color: "#eab308",

    sections: [
      {
        title: "Why User Awareness Matters",
        content:
          "Humans are often targeted by phishing, social engineering, and scams. Good training turns employees into an early‑warning system instead of a weakness."
      },
      {
        title: "Program Elements",
        subsections: [
          {
            name: "Phishing Simulations",
            description: "Safe tests that teach users to spot suspicious emails.",
            points: [
              "Measure click and report rates",
              "Give instant feedback and micro‑training",
              "Tailor difficulty over time"
            ]
          },
          {
            name: "Security Awareness Content",
            description: "Regular training that keeps concepts fresh.",
            points: [
              "Short videos, newsletters, and posters",
              "Topics: passwords, MFA, safe browsing, data handling",
              "Role‑based training for high‑risk teams"
            ]
          }
        ]
      }
    ],

    resources: [
      { title: "NIST Security Awareness Guidance", url: "https://csrc.nist.gov/projects/security-awareness-training" }
    ]
  },

  "emerging": {
    title: "🧠 Bonus: Emerging Fields",
    description: "New and fast‑growing areas like AI security, IoT security, and cyber law.",
    icon: "🧠",
    color: "#a855f7",

    sections: [
      {
        title: "AI & Machine Learning Security",
        subsections: [
          {
            name: "Threats to ML Systems",
            description: "How attackers can abuse AI models.",
            points: [
              "Data poisoning during training",
              "Model theft and inversion attacks",
              "Adversarial examples that fool classifiers"
            ]
          }
        ]
      },
      {
        title: "IoT Security",
        subsections: [
          {
            name: "Challenges",
            description: "Billions of small, often unpatched devices.",
            points: [
              "Weak or hard‑coded passwords",
              "Infrequent firmware updates",
              "Insecure network services exposed to the internet"
            ]
          }
        ]
      },
      {
        title: "Cyber Law & Policy",
        list: [
          "Privacy regulations like GDPR and similar laws",
          "Sector‑specific requirements (finance, healthcare)",
          "Computer crime laws that govern hacking activities"
        ]
      }
    ],

    resources: [
      { title: "ENISA Emerging Cybersecurity Trends", url: "https://www.enisa.europa.eu/topics" }
    ]
  }

};
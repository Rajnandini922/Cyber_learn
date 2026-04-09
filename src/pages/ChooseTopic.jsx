import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const topics = [
	{
		key: "network-security",
		label: "🔐 Network Security",
		desc: "Protecting data during transmission over networks.",
		subtopics: [
			"Firewalls",
			"VPNs",
			"IDS/IPS",
			"Zero Trust Architecture",
		],
	},
	{
		key: "application-security",
		label: "🛡️ Application Security",
		desc: "Securing software applications from threats.",
		subtopics: [
			"Secure coding",
			"OWASP Top 10",
			"SAST/DAST tools",
			"DevSecOps",
		],
	},
	{
		
		key: "information-security",
		label: "🗃️ Information Security (InfoSec)",
		desc: "Protecting information’s confidentiality, integrity, and availability (CIA triad).",
		subtopics: [
			"Data classification",
			"Encryption",
			"Access control",
			"ISO/IEC 27001",
		],
	},
	{
		key: "pentesting",
		label: "🧪 Penetration Testing & Ethical Hacking",
		desc: "Simulating cyberattacks to find vulnerabilities.",
		subtopics: [
			"Kali Linux",
			"Metasploit",
			"Burp Suite",
			"Web app pentesting",
			"Red Teaming",
		],
	},
	{
		key: "grc",
		label: "📜 Security Governance, Risk & Compliance (GRC)",
		desc: "Managing organizational risk, compliance, and policies.",
		subtopics: [
			"Risk assessment",
			"SOC 2",
			"HIPAA",
			"GDPR",
			"PCI-DSS",
			"NIST",
		],
	},
	{
		key: "endpoint-security",
		label: "🖥️ Endpoint Security",
		desc: "Securing user devices like laptops, mobile phones.",
		subtopics: ["Antivirus", "EDR", "MDM", "Patch management"],
	},
	{
		key: "cloud-security",
		label: "☁️ Cloud Security",
		desc: "Protecting cloud infrastructure and services (AWS, Azure, GCP).",
		subtopics: [
			"IAM",
			"CSPM",
			"Workload security",
			"CloudTrail",
			"Shared responsibility model",
		],
	},
	{
		key: "soc-ir",
		label: "🚨 Security Operations (SOC) & Incident Response",
		desc: "Monitoring and responding to threats and incidents.",
		subtopics: [
			"SIEM (Splunk, QRadar)",
			"Threat hunting",
			"Playbooks",
			"Incident lifecycle",
		],
	},
	{
		key: "cryptography",
		label: "🧬 Cryptography",
		desc: "Securing data using mathematical techniques.",
		subtopics: [
			"Symmetric/Asymmetric encryption",
			"Hashing",
			"Digital signatures",
			"PKI",
		],
	},
	{
		key: "forensics",
		label: "📊 Digital Forensics & Malware Analysis",
		desc: "Investigating cybercrime and analyzing malware.",
		subtopics: [
			"Memory forensics",
			"Reverse engineering",
			"Disk imaging",
			"Strings & hex tools",
		],
	},
	{
		key: "cti",
		label: "🤖 Cyber Threat Intelligence (CTI)",
		desc: "Studying adversaries and predicting threats.",
		subtopics: ["MITRE ATT&CK", "Threat feeds", "TTPs", "OSINT", "IOCs"],
	},
	{
		key: "iam",
		label: "🔧 Identity & Access Management (IAM)",
		desc: "Managing users and their permissions securely.",
		subtopics: ["MFA", "SSO", "RBAC", "LDAP", "Identity federation"],
	},
	{
		key: "architecture",
		label: "🏗️ Security Architecture & Engineering",
		desc: "Designing secure systems and infrastructures.",
		subtopics: [
			"Threat modeling",
			"Secure design principles",
			"Network segmentation",
		],
	},
	{
		key: "awareness",
		label: "👨‍🏫 Awareness & Training",
		desc: "Educating users about best security practices.",
		subtopics: ["Phishing simulations", "Security awareness programs"],
	},
	{
		key: "emerging",
		label: "🧠 Bonus: Emerging Fields",
		desc: "AI in Cybersecurity, IoT Security, Blockchain Security, Cyber Law & Policy.",
		subtopics: [
			"AI/ML for anomaly detection",
			"IoT Security",
			"Blockchain Security",
			"Cyber Law & Policy",
		],
	},
];

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.bgLeft} 50%, ${({ theme }) => theme.colors.bgRight} 50%);
`;

const Centered = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const glowFade = keyframes`
  0% {
	text-shadow: 0 0 12px #6C63FF, 0 0 24px #4F8CFF, 0 0 2px #fff;
	opacity: 1;
  }
  50% {
	text-shadow: 0 0 32px #6C63FF, 0 0 48px #4F8CFF, 0 0 8px #fff;
	opacity: 0.7;
  }
  100% {
	text-shadow: 0 0 12px #6C63FF, 0 0 24px #4F8CFF, 0 0 2px #fff;
	opacity: 1;
  }
`;

const GlowingHeading = styled.h2`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 2.1rem;
  font-weight: bold;
  animation: ${glowFade} 2.2s infinite ease-in-out;
  text-align: center;
`;

const TopicGrid = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  width: 100vw;
  max-width: 100vw;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const Divider = styled.div`
  width: 8vw;
  min-width: 80px;
  max-width: 120px;
  height: 100%;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.bgLeft} 0%, ${({ theme }) => theme.colors.bgRight} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TopicColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

const rotateIn2CW = keyframes`
  0% {
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
	opacity: 0;
  }
  100% {
	-webkit-transform: rotate(0);
	transform: rotate(0);
	opacity: 1;
  }
`;

const swirlInFwd = keyframes`
  0% {
	-webkit-transform: rotate(-540deg) scale(0);
	transform: rotate(-540deg) scale(0);
	opacity: 0;
  }
  100% {
	-webkit-transform: rotate(0) scale(1);
	transform: rotate(0) scale(1);
	opacity: 1;
  }
`;

const glowPulse = keyframes`
  0% {
	box-shadow: 0 0 16px 2px #6C63FF55, 0 2px 8px #4F8CFF33;
  }
  50% {
	box-shadow: 0 0 32px 6px #6C63FF99, 0 2px 16px #4F8CFF66;
  }
  100% {
	box-shadow: 0 0 16px 2px #6C63FF55, 0 2px 8px #4F8CFF33;
  }
`;

const TopicButton = styled.button`
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 0 16px 2px #6C63FF55, 0 2px 8px #4F8CFF33;
  text-align: left;
  transition: border 0.2s, background 0.2s;
  animation: ${rotateIn2CW} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both, ${glowPulse} 2.2s infinite alternate;
  width: 440px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  &.swirl-in-fwd {
	animation: ${swirlInFwd} 0.6s ease-out both, ${glowPulse} 2.2s infinite alternate;
  }
  &:hover {
	border-color: ${({ theme }) => theme.colors.accentAlt};
	background: ${({ theme }) => theme.colors.accent}22;
	box-shadow: 0 0 40px 8px #6C63FFcc, 0 2px 24px #4F8CFF99;
  }
`;

const Desc = styled.div`
	font-size: 0.95rem;
	color: ${({ theme }) => theme.colors.accent};
	margin-top: 0.25rem;
`;

export default function ChooseTopic() {
  const navigate = useNavigate();
  const [clickedKey, setClickedKey] = useState(null);
  const handleChoose = (topic) => {
	setClickedKey(topic.key);
	setTimeout(() => {
	  localStorage.setItem("cybersecTopic", topic.key);
	  if (topic.key === "network-security") {
		navigate("/network-security");
	  } else {
		navigate("/topic-details");
	  }
	}, 600); // match animation duration
  };

  return (
	<Container>
	  <Navbar />
	  <Centered>
		<GlowingHeading>Choose a topic to start learning:</GlowingHeading>
	  </Centered>
	  <TopicGrid>
		<TopicColumn style={{marginLeft: '2vw', alignItems: 'flex-end'}}>
		  {topics.slice(0, Math.ceil((topics.length-1)/2)).map((topic) => (
			<TopicButton
			  key={topic.key}
			  onClick={() => handleChoose(topic)}
			  className={clickedKey === topic.key ? 'swirl-in-fwd' : ''}
			>
			  <div>{topic.label}</div>
			  <Desc>{topic.desc}</Desc>
			</TopicButton>
		  ))}
		</TopicColumn>
		<Divider />
		<TopicColumn style={{marginRight: '2vw', alignItems: 'flex-start'}}>
		  {topics.slice(Math.ceil((topics.length-1)/2), topics.length-1).map((topic) => (
			<TopicButton
			  key={topic.key}
			  onClick={() => handleChoose(topic)}
			  className={clickedKey === topic.key ? 'swirl-in-fwd' : ''}
			>
			  <div>{topic.label}</div>
			  <Desc>{topic.desc}</Desc>
			</TopicButton>
		  ))}
		</TopicColumn>
	  </TopicGrid>
	  <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2.5rem'}}>
		<TopicButton
		  key={topics[topics.length-1].key}
		  onClick={() => handleChoose(topics[topics.length-1])}
		  className={clickedKey === topics[topics.length-1].key ? 'swirl-in-fwd' : ''}
		>
		  <div>{topics[topics.length-1].label}</div>
		  <Desc>{topics[topics.length-1].desc}</Desc>
		</TopicButton>
	  </div>
	</Container>
  );
}

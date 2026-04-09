
import React, { useState } from "react";
// ...FirewallBuilderGame import removed...
import styled from "styled-components";
import Navbar from "../components/Navbar";

// Magnifying glass pop effect for all arrow-point words
const popWordStyle = <style>{`
  .pop-word {
    display: inline-block;
    transition: transform 0.25s cubic-bezier(0.77,0,0.175,1), box-shadow 0.25s cubic-bezier(0.77,0,0.175,1);
    border-radius: 50%;
    padding: 0.1em 0.3em;
  }
  .pop-word:hover {
    transform: scale(1.25);
    color: #1976D2;
    background: #E3F0FF;
    box-shadow: 0 0 18px 6px #B3E5FC88, 0 2px 8px #E1F5FE55;
    z-index: 2;
  }
`}</style>;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(120deg, #1A2233 0%, #283A5B 60%, #3B4A6B 100%);
  transition: background 1.2s cubic-bezier(0.77,0,0.175,1);
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  padding: 2rem 1rem;
  color: #F3F6FB;
  transition: box-shadow 0.8s;
`;

const Section = styled.section`
  background: linear-gradient(120deg, #232B3E 0%, #2C3E5A 100%);
  border-radius: 20px;
  box-shadow: 0 0 32px 0 #283A5B88, 0 2px 16px #3B4A6B55;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: #F3F6FB;
  transition: box-shadow 0.8s, background 1.2s;
`;

const NextButton = styled.button`
  background: linear-gradient(90deg, #4F8CFF 0%, #6C63FF 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 12px #4F8CFF88, 0 2px 8px #6C63FF55;
  margin-top: 2rem;
  transition: background 0.4s, box-shadow 0.6s;
  &:hover {
    background: linear-gradient(90deg, #6C63FF 0%, #4F8CFF 100%);
    box-shadow: 0 0 24px #6C63FFcc;
  }
`;

const HighlightBar = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(90deg, #B3E5FC 0%, #E1F5FE 100%);
  color: #1565C0;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 0.8rem 1.4rem;
  border-radius: 14px;
  box-shadow: 0 0 18px 0 #B3E5FC88, 0 2px 8px #E1F5FE55;
  margin: 2rem 0 1.5rem 0;
  text-shadow: 0 2px 6px #B3E5FC99;
  letter-spacing: 0.6px;
  outline: 1.5px solid #B3E5FC;
  transition: box-shadow 0.8s, background 1.2s, transform 0.5s cubic-bezier(0.77,0,0.175,1);
  animation: highlightGlow 2.5s infinite alternate, scaleIn 0.7s cubic-bezier(0.77,0,0.175,1);
  @keyframes highlightGlow {
    from { box-shadow: 0 0 12px #B3E5FC88, 0 0 4px #E1F5FE55; }
    to { box-shadow: 0 0 32px #B3E5FCcc, 0 0 12px #E1F5FE99; }
  }
  @keyframes scaleIn {
    from { transform: scale(0.96); }
    to { transform: scale(1); }
  }
`;

const sections = [
  {
    title: "What is Network Security?",
    content: (
      <>
        <HighlightBar>Beginner Level</HighlightBar>
        <p>Network security is the practice of protecting a computer network from unauthorized access, misuse, data theft, or disruption.</p>
        <p>Every time you visit a website, stream a video, or send a message, your data travels through a network — often over the internet. Without protection, attackers could intercept that data, steal it, or modify it.</p>
        <HighlightBar>Real-Life Example</HighlightBar>
        <p>Imagine sending a letter through the mail. Without sealing it in an envelope, anyone can read or change it. Network security ensures your “digital letters” are sealed and delivered safely.</p>
        <HighlightBar>Why It Matters</HighlightBar>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Prevents data leaks</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Ensures availability of services</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Maintains privacy and integrity of communication</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Protects organizations from huge financial and legal risks</span></li>
        </ul>
      </>
    ),
  },
  {
    title: "Firewall – The First Line of Defense",
    content: (
      <>
        <HighlightBar>What is a Firewall?</HighlightBar>
        <p>A firewall is a software or hardware system that acts as a gatekeeper between your internal network and external sources like the internet. It decides what traffic should be allowed and what should be blocked.</p>
        <HighlightBar>Analogy</HighlightBar>
        <p>A firewall is like a security guard at a building entrance. Only known, verified visitors are allowed in.</p>
        <HighlightBar>How It Works</HighlightBar>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Checks IP addresses, ports, protocols, and packet contents.</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">If the traffic matches a rule (e.g., block access to port 23), it's denied.</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">You can block whole countries, allow only certain applications, or allow traffic only during specific times.</span></li>
        </ul>
        <HighlightBar>Types of Firewalls</HighlightBar>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Packet Filtering: Basic rules like "block all traffic on port 80"</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Stateful Inspection: Tracks sessions and knows if a response is related to a previous request</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Proxy Firewall: Hides internal network by acting as a middleman</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Next-Gen Firewall: Includes deep packet inspection, intrusion prevention, malware scanning</span></li>
        </ul>
        <HighlightBar>Real-World Example</HighlightBar>
        <p>Company firewalls often block sites like Facebook, YouTube, or torrenting apps to maintain security and productivity.</p>
      </>
    ),
  },
  {
    title: "IDS and IPS – Watchdogs of the Network",
    content: (
      <>
        <HighlightBar>IDS vs IPS</HighlightBar>
        <p><strong>Intrusion Detection System (IDS):</strong> Monitors network traffic and generates alerts if it detects suspicious patterns. It doesn’t stop the attack — it informs you.</p>
        <p><strong>Intrusion Prevention System (IPS):</strong> Does what IDS does, but can also take action, like blocking traffic or cutting off connections automatically.</p>
        <HighlightBar>Example Use Case</HighlightBar>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">If 1000 login attempts are made in 1 second, the IDS alerts you.</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">The IPS may automatically block that IP address.</span></li>
        </ul>
        <HighlightBar>Difference at a Glance</HighlightBar>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr><th>Feature</th><th>IDS</th><th>IPS</th></tr>
          </thead>
          <tbody>
            <tr><td>Action</td><td>Detects only</td><td>Detects and blocks</td></tr>
            <tr><td>Use Case</td><td>Monitoring environments</td><td>Preventing known threats</td></tr>
            <tr><td>Passive/Active</td><td>Passive</td><td>Active</td></tr>
          </tbody>
        </table>
        <HighlightBar>Popular IDS/IPS Tools</HighlightBar>
        <p>Snort, Suricata, Zeek (formerly Bro)</p>
      </>
    ),
  },
  {
    title: "VPN – Secure Your Internet Journey",
    content: (
      <>
        <HighlightBar>What is a VPN?</HighlightBar>
        <p>A VPN (Virtual Private Network) provides a secure tunnel between your device and the internet. All the data sent through a VPN is encrypted, meaning it's unreadable to outsiders (even your ISP or hackers).</p>
        <HighlightBar>Why Use a VPN?</HighlightBar>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Protect data on public Wi-Fi (e.g., at cafes, airports)</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Hide your real IP address</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Bypass censorship and geographic restrictions</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Secure remote work connections to corporate servers</span></li>
        </ul>
        <HighlightBar>How It Works</HighlightBar>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">You connect to a VPN server</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Your internet data gets encrypted and routed through that server</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Websites see only the VPN server’s IP address, not yours</span></li>
        </ul>
        <HighlightBar>Protocols Used</HighlightBar>
        <p>OpenVPN, IPsec, WireGuard</p>
        <HighlightBar>Real-World Example</HighlightBar>
        <p>You connect to public Wi-Fi at an airport. A hacker nearby is sniffing traffic. Without a VPN, they might see your passwords. With a VPN, all they see is encrypted gibberish.</p>
      </>
    ),
  },
  {
    title: "Zero Trust Security – Never Trust, Always Verify",
    content: (
      <>
        <HighlightBar>What is Zero Trust?</HighlightBar>
        <p>Zero Trust is a security philosophy that assumes no user or system should be trusted by default, even if they are inside the network.</p>
        <HighlightBar>Key Principle</HighlightBar>
        <p>“Trust no one. Always verify identity, context, and access level.”</p>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Every request (from user or device) must be authenticated and authorized</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Access is granted based on strict policies</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Continuous monitoring is in place</span></li>
        </ul>
        <HighlightBar>Real-World Scenario</HighlightBar>
        <p>Alice logs into the company network. She’s in HR, so she should only access HR files. Even though she’s inside the company network, she can't open Finance or IT folders.</p>
        <HighlightBar>Benefits</HighlightBar>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Limits internal damage if an attacker gets in</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Reduces the attack surface</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Works well with cloud environments and remote work</span></li>
        </ul>
        <HighlightBar>Key Tech for Zero Trust</HighlightBar>
        <p>Multi-Factor Authentication (MFA), Micro-segmentation, Identity and Access Management (IAM), Least privilege access</p>
      </>
    ),
  },
  {
    title: "Common Network Threats Explained",
    content: (
      <>
        <HighlightBar>DDoS (Distributed Denial of Service)</HighlightBar>
        <p>Attackers overwhelm a system (like a website or server) with so many requests that it crashes or becomes unavailable.</p>
        <p><strong>Real Example:</strong> In 2016, the Mirai botnet took down major websites (like Twitter and Netflix) using DDoS attacks from infected IoT devices.</p>
        <HighlightBar>Packet Sniffing</HighlightBar>
        <p>Capturing data packets as they travel across a network.</p>
        <p><strong>Risks:</strong> If the data isn't encrypted, attackers can see usernames, passwords, or even your emails.</p>
        <p><strong>Defense:</strong> Use encrypted protocols (HTTPS, SSH) or a VPN.</p>
        <HighlightBar>Spoofing</HighlightBar>
        <p>Masquerading as another device or person to gain unauthorized access.</p>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">IP Spoofing</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">Email Spoofing</span></li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><span style={{fontSize: '1.2em'}}>➔</span><span className="pop-word">ARP Spoofing</span></li>
        </ul>
        <p><strong>Example:</strong> An attacker sends an email that looks like it's from your boss asking for sensitive files.</p>
        <HighlightBar>MITM (Man-in-the-Middle)</HighlightBar>
        <p>An attacker secretly intercepts and possibly alters communication between two parties.</p>
        <p><strong>Example:</strong> You're shopping online, but a hacker between you and the website steals your credit card info.</p>
        <p><strong>Defense:</strong> HTTPS-only websites, VPNs, TLS encryption</p>
      </>
    ),
  },
  {
    title: "Practice Tools",
    content: (
      <>
        <HighlightBar>Wireshark</HighlightBar>
        <p>Captures and analyzes network packets in real-time. Great for understanding how networks operate.</p>
        <p><strong>Use Case:</strong> See what happens when you visit google.com or detect anomalies in your traffic.</p>
        <p><strong>Skill Level:</strong> Intermediate</p>
        <HighlightBar>Try This in Your App</HighlightBar>
        <p>Include a sample capture (PCAP file) and ask users to find the password in plain text.</p>
        <HighlightBar>Nmap</HighlightBar>
        <p>Scans networks to find live devices, open ports, and services.</p>
        <p><strong>Use Case:</strong> Check what services are running on your system or identify vulnerable ports.</p>
        <p><strong>Basic Command:</strong> <code>nmap -sS 192.168.1.1</code> → performs a TCP SYN scan on the host</p>
        <p><strong>Skill Level:</strong> Beginner to Advanced</p>
      </>
    ),
  },
];

export default function NetworkSecurityDetails() {
  const [step, setStep] = useState(0);
  // ...Quick Quiz modal state removed...
  return (
    <>
      {popWordStyle}
      <Container>
        <Navbar />
        <Content>
          <Section>
            <h2>{sections[step].title}</h2>
            {sections[step].content}
            {step < sections.length - 1 && (
              <NextButton onClick={() => setStep(step + 1)}>Next</NextButton>
            )}
            {step > 0 && (
              <NextButton style={{background: '#3E4C59'}} onClick={() => setStep(step - 1)}>Previous</NextButton>
            )}
            {/* Quick Quiz modal removed */}
          </Section>
        </Content>
      </Container>
    </>
  );
}

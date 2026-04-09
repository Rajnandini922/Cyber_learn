import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { topicsData } from "../data/topicsData";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding-bottom: 4rem;
`;

const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Icon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: ${props => props.color || '#06b6d4'};
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  font-weight: 800;
`;

const Description = styled.p`
  color: #cbd5e1;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
`;

const Section = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  color: #06b6d4;
  margin: 0 0 1.5rem 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const SectionContent = styled.p`
  color: #e2e8f0;
  line-height: 1.8;
  font-size: 1.05rem;
  margin-bottom: 1rem;
`;

const SubSection = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border-left: 4px solid #06b6d4;
`;

const SubSectionTitle = styled.h3`
  color: #fbbf24;
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 700;
`;

const SubSectionDesc = styled.p`
  color: #cbd5e1;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.6;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const ListItem = styled.li`
  color: #e2e8f0;
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
  font-size: 1rem;
  
  &:before {
    content: "▹";
    position: absolute;
    left: 0;
    color: #06b6d4;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const ToolCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin: 0.75rem 0;
  border: 1px solid rgba(6, 182, 212, 0.3);
  
  strong {
    color: #06b6d4;
    font-size: 1.1rem;
  }
  
  p {
    color: #cbd5e1;
    margin: 0.5rem 0 0 0;
  }
`;

const ResourcesSection = styled(motion.div)`
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 3rem;
  border: 1px solid rgba(6, 182, 212, 0.3);
`;

const ResourceLink = styled.a`
  display: block;
  color: #06b6d4;
  text-decoration: none;
  padding: 1rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s;
  border: 1px solid rgba(6, 182, 212, 0.2);
  
  &:hover {
    background: rgba(6, 182, 212, 0.1);
    transform: translateX(8px);
    border-color: #06b6d4;
  }
`;

const BackButton = styled(motion.button)`
  background: rgba(6, 182, 212, 0.2);
  color: #06b6d4;
  border: 2px solid #06b6d4;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 2rem;
  
  &:hover {
    background: #06b6d4;
    color: #0f172a;
  }
`;

export default function TopicDetails() {
  const navigate = useNavigate();
  const [topicKey, setTopicKey] = useState(null);
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const savedTopic = localStorage.getItem("cybersecTopic");
    if (savedTopic && topicsData[savedTopic]) {
      setTopicKey(savedTopic);
      setTopic(topicsData[savedTopic]);
    } else {
      navigate("/choose-topic");
    }
  }, [navigate]);

  if (!topic) {
    return <div style={{ background: '#0f172a', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  return (
    <Container>
      <Navbar />
      <Content>
        <BackButton
          onClick={() => navigate("/choose-topic")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Topics
        </BackButton>

        <Header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Icon>{topic.icon}</Icon>
          <Title color={topic.color}>{topic.title}</Title>
          <Description>{topic.description}</Description>
        </Header>

        {topic.sections.map((section, idx) => (
          <Section
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <SectionTitle>{section.title}</SectionTitle>
            
            {section.content && (
              <SectionContent>{section.content}</SectionContent>
            )}

            {section.list && (
              <List>
                {section.list.map((item, i) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </List>
            )}

            {section.subsections && section.subsections.map((sub, subIdx) => (
              <SubSection key={subIdx}>
                <SubSectionTitle>{sub.name}</SubSectionTitle>
                {sub.description && (
                  <SubSectionDesc>{sub.description}</SubSectionDesc>
                )}
                {sub.points && (
                  <List>
                    {sub.points.map((point, i) => (
                      <ListItem key={i}>{point}</ListItem>
                    ))}
                  </List>
                )}
              </SubSection>
            ))}

            {section.tools && (
              <div>
                {section.tools.map((tool, toolIdx) => (
                  <ToolCard key={toolIdx}>
                    <strong>{tool.name}</strong>
                    <p>{tool.description}</p>
                  </ToolCard>
                ))}
              </div>
            )}

            {section.steps && (
              <List>
                {section.steps.map((step, i) => (
                  <ListItem key={i}>{step}</ListItem>
                ))}
              </List>
            )}
          </Section>
        ))}

        {topic.resources && topic.resources.length > 0 && (
          <ResourcesSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SectionTitle>📚 Learning Resources</SectionTitle>
            {topic.resources.map((resource, idx) => (
              <ResourceLink
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resource.title} →
              </ResourceLink>
            ))}
          </ResourcesSection>
        )}
      </Content>
    </Container>
  );
}
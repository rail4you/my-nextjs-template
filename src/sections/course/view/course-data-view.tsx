'use client'
import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Divider,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

const NavItem = styled(ListItemButton)(({ active }) => ({
  borderRadius: '8px',
  margin: '4px 8px',
  padding: '12px 16px',
  backgroundColor: active ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' : 'transparent',
  color: active ? '#ffffff' : '#64748b',
  fontWeight: active ? 600 : 500,
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: active ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' : '#f1f5f9',
    transform: 'translateX(4px)',
  },
  '& .MuiListItemText-primary': {
    fontSize: '0.875rem',
    fontWeight: active ? 600 : 500,
  },
}));

const SectionGroup = styled(Box)(({ theme }) => ({
  marginBottom: '24px',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  padding: '8px 16px',
  marginBottom: '8px',
}));

const CourseNavigationPage = () => {
  const [activeSection, setActiveSection] = useState('core-data');
  
  const sections = [
    { 
      id: 'core-data', 
      label: '课程核心数据',
      group: 'overview',
      icon: '📊'
    },
    { 
      id: 'teaching-materials', 
      label: '教学教材',
      group: 'content',
      icon: '📚'
    },
    { 
      id: 'course-background', 
      label: '课程背景',
      group: 'content',
      icon: '📖'
    },
    { 
      id: 'course-intro', 
      label: '课程简介',
      group: 'content',
      icon: '📝'
    },
    { 
      id: 'course-objectives', 
      label: '课程目标',
      group: 'content',
      icon: '🎯'
    },
    { 
      id: 'design-principles', 
      label: '课程设计原则',
      group: 'content',
      icon: '🏗️'
    },
    { 
      id: 'course-features', 
      label: '课程特色',
      group: 'content',
      icon: '✨'
    },
    { 
      id: 'knowledge-structure', 
      label: '课程知识逻辑',
      group: 'content',
      icon: '🧠'
    },
    { 
      id: 'teaching-plan', 
      label: '教学计划表',
      group: 'planning',
      icon: '📅'
    },
    { 
      id: 'announcements', 
      label: '课程公告',
      group: 'planning',
      icon: '📢'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const groupSections = () => {
    const grouped = {
      overview: [],
      content: [],
      planning: []
    };
    
    sections.forEach(section => {
      grouped[section.group].push(section);
    });
    
    return grouped;
  };

  const groupedSections = groupSections();

  const navWidth = 280;

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Left Navigation */}
      <Box
        sx={{
          width: navWidth,
          flexShrink: 0,
          bgcolor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid #e2e8f0',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white'
        }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
            📊 课程导航
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            中医护理学
          </Typography>
        </Box>

        {/* Navigation Content */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {/* Overview Section */}
          <SectionGroup>
            <SectionTitle>概览</SectionTitle>
            {groupedSections.overview.map((section) => (
              <NavItem
                key={section.id}
                active={activeSection === section.id}
                onClick={() => scrollToSection(section.id)}
              >
                <ListItemText 
                  primary={`${section.icon} ${section.label}`}
                />
              </NavItem>
            ))}
          </SectionGroup>

          {/* Content Section */}
          <SectionGroup>
            <SectionTitle>课程内容</SectionTitle>
            {groupedSections.content.map((section) => (
              <NavItem
                key={section.id}
                active={activeSection === section.id}
                onClick={() => scrollToSection(section.id)}
              >
                <ListItemText 
                  primary={`${section.icon} ${section.label}`}
                />
              </NavItem>
            ))}
          </SectionGroup>

          {/* Planning Section */}
          <SectionGroup>
            <SectionTitle>教学规划</SectionTitle>
            {groupedSections.planning.map((section) => (
              <NavItem
                key={section.id}
                active={activeSection === section.id}
                onClick={() => scrollToSection(section.id)}
              >
                <ListItemText 
                  primary={`${section.icon} ${section.label}`}
                />
              </NavItem>
            ))}
          </SectionGroup>

          {/* Quick Stats */}
          <Box sx={{ p: 2, mt: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
              快速统计
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              <Chip label="知识点: 201" size="small" sx={{ fontSize: '0.7rem' }} />
              <Chip label="知识节点: 326" size="small" sx={{ fontSize: '0.7rem' }} />
              <Chip label="教学资源: 0" size="small" sx={{ fontSize: '0.7rem' }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          overflowY: 'auto',
          bgcolor: '#f8fafc',
          ml: 0
        }}
      >
        <Container maxWidth="xl">
          {/* Core Data Section */}
          <Box id="core-data" sx={{ mb: 8, scrollMarginTop: '20px' }}>
            <Box sx={{ 
              mb: 4, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Typography variant="h4" fontWeight={700} color="#1e293b">
                课程核心数据
              </Typography>
              <Box sx={{ 
                height: '4px', 
                flex: 1, 
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: 2 
              }} />
            </Box>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid xs={12} sm={6} md={2.4}>
                <Card 
                  sx={{ 
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', 
                    color: 'white',
                    height: '100%',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(25, 118, 210, 0.4)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ mb: 1, opacity: 0.95 }}>
                      知识点
                    </Typography>
                    <Typography variant="h2" fontWeight={700}>
                      201
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} sm={6} md={2.4}>
                <Card sx={{ 
                  height: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      知识节点
                    </Typography>
                    <Typography variant="h3" fontWeight={600} color="#ffffff">
                      326
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} sm={6} md={2.4}>
                <Card sx={{ 
                  height: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      教学资源
                    </Typography>
                    <Typography variant="h3" fontWeight={600} color="#ffffff">
                      0
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} sm={6} md={2.4}>
                <Card sx={{ 
                  height: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      知识点教案
                    </Typography>
                    <Typography variant="h3" fontWeight={600} color="#ffffff">
                      0
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} sm={6} md={2.4}>
                <Card sx={{ 
                  height: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      能力目标
                    </Typography>
                    <Typography variant="h3" fontWeight={600} color="#ffffff">
                      0
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
  
          </Box>

          {/* Teaching Materials Section */}
          <Box id="teaching-materials" sx={{ mb: 8, scrollMarginTop: '20px' }}>
            <Box sx={{ 
              mb: 4, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Typography variant="h4" fontWeight={700} color="#1e293b">
                教学教材
              </Typography>
              <Box sx={{ 
                height: '4px', 
                flex: 1, 
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: 2 
              }} />
            </Box>
            
            <Card sx={{ 
              p: 4, 
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
              }
            }}>
              <Box 
                sx={{ 
                  width: 180, 
                  height: 260, 
                  background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', 
                  mx: 'auto', 
                  mb: 3, 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 24px rgba(236, 72, 153, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    animation: 'shimmer 3s infinite'
                  }
                }} 
              >
                中医护理学
              </Box>
              <Typography variant="h6" fontWeight={600} color="#1e293b" sx={{ mb: 1 }}>
                中医护理学
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                人民卫生出版社
              </Typography>
              <Typography variant="caption" color="text.disabled">
                ISBN 9787117328296
              </Typography>
            </Card>
          </Box>

          {/* Course Background Section */}
          <Box id="course-background" sx={{ mb: 8, scrollMarginTop: '20px' }}>
            <Box sx={{ 
              mb: 4, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Typography variant="h4" fontWeight={700} color="#1e293b">
                课程背景
              </Typography>
              <Box sx={{ 
                height: '4px', 
                flex: 1, 
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: 2 
              }} />
            </Box>
            
            <Card sx={{ 
              p: 4, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
              }
            }}>
              <Typography variant="body1" sx={{ lineHeight: 1.8,}}>
                1、在"健康中国"背景下，促进中医药文化的传承和创新。2、更好发挥中医护理在临床护理、预防保健、康复养生中的作用。3、推动中西医结合护理学科的进步和发展。
              </Typography>
            </Card>
          </Box>

          {/* Course Introduction Section */}
          <Box id="course-intro" sx={{ mb: 8, scrollMarginTop: '20px' }}>
            <Box sx={{ 
              mb: 4, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Typography variant="h4" fontWeight={700}  color="#1e293b">
                课程简介
              </Typography>
              <Box sx={{ 
                height: '4px', 
                flex: 1, 
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: 2 
              }} />
            </Box>
            
            <Card sx={{ 
              p: 4, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
              }
            }}>
              <Typography variant="body1" sx={{ lineHeight: 1.8,  }}>
                中医护理学是中医药学的重要组成部分，是随着中医学的形成与发展而逐渐兴起的学科，它是以中医学理论为指导，结合预防、保健、康复和养生等功能，并运用独特的传统护理技术，对患者及孕、弱、幼、残者施以护理，以保护人民健康的一门应用学科。本课程内容包括绪论、中医学基本理论、方药基本知识、经络腧穴基本知识、常用中医护理技术、体质辨识与调护、中医养生保健、中医临床护理应用等。
              </Typography>
            </Card>
          </Box>

          {/* Course Objectives Section */}
          <Box id="course-objectives" sx={{ mb: 8, scrollMarginTop: '20px' }}>
            <Box sx={{ 
              mb: 4, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Typography variant="h4" fontWeight={700} color="#1e293b">
                课程目标
              </Typography>
              <Box sx={{ 
                height: '4px', 
                flex: 1, 
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: 2 
              }} />
            </Box>
            
            <Card sx={{ 
              p: 4, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
              }
            }}>
              <Typography variant="body1" sx={{ lineHeight: 1.8,}}>
                1、掌握中医护理学的概念、辨证施护的特点；2、熟悉中医学理论体系的基本知识；3、掌握中医护理的基本知识和技能；4、能对常见病证进行辨证施护；5、培养中医思维，建立正确的健康观。
              </Typography>
            </Card>
          </Box>

          {/* Design Principles Section */}
          <Box id="design-principles" sx={{ mb: 8, scrollMarginTop: '20px' }}>
            <Box sx={{ 
              mb: 4, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Typography variant="h4" fontWeight={700} color="#1e293b" >
                课程设计原则
              </Typography>
              <Box sx={{ 
                height: '4px', 
                flex: 1, 
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: 2 
              }} />
            </Box>
            
            <Card sx={{ 
              p: 4, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
              }
            }}>
              <Typography variant="body1" sx={{ lineHeight: 1.8,  }}>
                1、基础理论和临床知识相结合；2、中医护理和现代护理相结合；3、继承传统与创新发展相结合；
              </Typography>
            </Card>
          </Box>

          {/* Placeholder sections */}
          {['course-features', 'knowledge-structure', 'teaching-plan', 'announcements'].map((id) => (
            <Box key={id} id={id} sx={{ mb: 8, scrollMarginTop: '20px' }}>
              <Box sx={{ 
                mb: 4, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2 
              }}>
                <Typography variant="h4" fontWeight={700} color="#1e293b">
                  {sections.find(s => s.id === id)?.label}
                </Typography>
                <Box sx={{ 
                  height: '4px', 
                  flex: 1, 
                  background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                  borderRadius: 2 
                }} />
              </Box>
              
              <Card sx={{ 
                p: 4, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography variant="body1" color="text.disabled" sx={{ textAlign: 'center' }}>
                  内容待补充...
                </Typography>
              </Card>
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default CourseNavigationPage;
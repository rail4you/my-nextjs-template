'use client'
import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  Stack,
  Collapse,
  IconButton,
  Grid,
  Divider,
  Paper
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';

export function CourseCategoryView() {
  const [expandedSections, setExpandedSections] = useState({
    section1: true,
    section2: false,
    section3: false,
    section4: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const courseData = [
    {
      id: 'section1',
      number: '01',
      title: '绪论',
    //   color: '#E3F2FD',
    //   borderColor: '#BBDEFB',
      topics: [
        {
          title: '中医护理学发展概况',
          content: '介绍了古代、近代和现代中医护理学的发展历程。'
        },
        {
          title: '中医护理的基本特点',
          content: '介绍了中医护理学以整体观念和辨证施护为核心的特点。'
        },
        {
          title: '中西医结合护理',
          content: '介绍了中西医护理在发展历程、理论基础、护理理念和实践应用上的相互吸纳与融合。'
        }
      ]
    },
    {
      id: 'section2',
      number: '02',
      title: '中医护理基本理论',
    //   color: '#E8F5E9',
    //   borderColor: '#C8E6C9',
      topics: []
    },
    {
      id: 'section3',
      number: '03',
      title: '中医护理评估',
    //   color: '#F1F8E9',
    //   borderColor: '#DCEDC8',
      topics: []
    },
    {
      id: 'section4',
      number: '04',
      title: '中医辨证方法',
    //   color: '#F3E5F5',
    //   borderColor: '#E1BEE7',
      topics: []
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
            图谱框架
          </Typography>
          <Typography variant="body1" color="text.secondary">
            中医护理学课程知识体系
          </Typography>
        </Box>

        {/* Main Layout */}
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={2}>
            <Paper 
              sx={{ 
                p: 2.5, 
                position: { md: 'sticky' }, 
                top: 24,
                boxShadow: 1
              }}
            >
              <Stack spacing={2}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'text.secondary', 
                    fontWeight: 500,
                    pb: 1,
                    borderBottom: 1,
                    borderColor: 'divider'
                  }}
                >
                  课程体系设计
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  课程结构
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 600,
                    bgcolor: 'primary.50',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1
                  }}
                >
                  课程框架
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={10}>
            <Stack spacing={2}>
              {courseData.map((section) => (
                <Card 
                  key={section.id}
                  sx={{ 
                    boxShadow: 1,
                    border: 1,
                    borderColor: section.borderColor,
                    overflow: 'hidden'
                  }}
                >
                  {/* Section Header */}
                  <Box
                    sx={{
                      bgcolor: section.color,
                      p: 2,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 0.8 }
                    }}
                    onClick={() => toggleSection(section.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: 'grey.900',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <MenuBookIcon sx={{ color: 'white', fontSize: 20 }} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {section.number}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {section.title}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton size="small">
                      {expandedSections[section.id] ? (
                        <ExpandMoreIcon />
                      ) : (
                        <ChevronRightIcon />
                      )}
                    </IconButton>
                  </Box>

                  {/* Section Content */}
                  <Collapse in={expandedSections[section.id]}>
                    <Box sx={{ p: 3 }}>
                      {section.topics.length > 0 ? (
                        <Stack spacing={3}>
                          {section.topics.map((topic, index) => (
                            <Box 
                              key={index}
                              sx={{ 
                                borderLeft: 4, 
                                borderColor: 'primary.main',
                                pl: 2
                              }}
                            >
                              <Typography 
                                variant="subtitle1" 
                                sx={{ fontWeight: 600, mb: 1 }}
                              >
                                {topic.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ lineHeight: 1.7 }}
                              >
                                {topic.content}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      ) : (
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ textAlign: 'center', fontStyle: 'italic' }}
                        >
                          内容待补充...
                        </Typography>
                      )}
                    </Box>
                  </Collapse>
                </Card>
              ))}
            </Stack>

            {/* Info Cards */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, boxShadow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'primary.50',
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <MenuBookIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      课程分类导航
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    展示中医护理学课程的知识图谱框架和分类结构，帮助学习者系统化掌握课程体系。
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, boxShadow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'success.50',
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <MenuBookIcon sx={{ color: 'success.main', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      知识点关系
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    展示各个知识点之间的关联关系和层次结构，构建完整的中医护理知识网络体系。
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
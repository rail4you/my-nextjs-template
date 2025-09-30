'use client'
import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Divider,
  Stack
} from '@mui/material';
import {
  PlayArrow,
  Favorite,
  Share,
  Bookmark,
  ThumbUp,
  AccessTime,
  Person,
  Star
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const VideoPlayer = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%', // 16:9 aspect ratio
  backgroundColor: '#000',
  borderRadius: 12,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(21, 101, 192, 0.05) 100%)',
    zIndex: 1,
  },
}));

const PlayButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 80,
  height: 80,
  backgroundColor: 'rgba(25, 118, 210, 0.9)',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 1)',
    transform: 'translate(-50%, -50%) scale(1.1)',
  },
  zIndex: 2,
}));

const VideoInfo = styled(Card)(() => ({
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  marginBottom: 24,
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`video-tabpanel-${index}`}
      aria-labelledby={`video-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const videoLessons = [
  {
    id: 1,
    title: '第一章：中医护理学概述',
    duration: '25:30',
    views: 1234,
    instructor: '白老师',
    thumbnail: '/api/placeholder/320/180',
    progress: 75,
    featured: true,
    muxUrl: 'https://player.mux.com/rR8P8mSaKDzz02TsftugTUdI00cQPJX00oy'
  }
];

export function CourseVideoView() {
  const [currentVideo, setCurrentVideo] = useState(videoLessons[0]);
  const [tabValue, setTabValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleVideoSelect = (video: typeof videoLessons[0]) => {
    setCurrentVideo(video);
    setIsPlaying(false);
  };

  const handlePlayVideo = () => {
    if (iframeRef.current) {
      // Try to play the video by posting message to iframe
      try {
        iframeRef.current.contentWindow?.postMessage(
          { type: 'play' },
          '*'
        );
      } catch (error) {
        console.log('Unable to control iframe directly');
      }
    }
    setIsPlaying(true);
  };

  const muxPlayerUrl = `${currentVideo.muxUrl}?metadata-video-title=${encodeURIComponent(currentVideo.title)}&video-title=${encodeURIComponent(currentVideo.title)}&autoplay=true`;

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
      {/* Video Player Section */}
      <Box sx={{ 
        bgcolor: '#000000',
        position: 'relative',
        width: '100%',
        height: '70vh',
        maxHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Mux Video Player */}
        {!isPlaying ? (
          <>
            {/* Thumbnail Background */}
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=675&fit=crop"
              alt={currentVideo.title}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.8
              }}
            />
            
            {/* Play Button */}
            <IconButton
              onClick={handlePlayVideo}
              sx={{
                position: 'absolute',
                width: 100,
                height: 100,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  transform: 'scale(1.1)',
                },
                zIndex: 10,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <PlayArrow sx={{ fontSize: 60 }} />
            </IconButton>
            
            {/* Video Info Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                p: 4,
                color: 'white'
              }}
            >
              <Typography variant="h4" fontWeight={700} mb={2}>
                {currentVideo.title}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={4}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTime />
                  <Typography variant="body1">
                    {currentVideo.duration}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Person />
                  <Typography variant="body1">
                    {currentVideo.instructor}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <ThumbUp />
                  <Typography variant="body1">
                    {currentVideo.views.toLocaleString()} 次观看
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </>
        ) : (
          <>
            {/* Mux Player Iframe */}
            <iframe
              ref={iframeRef}
              src={muxPlayerUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                zIndex: 5
              }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              title={currentVideo.title}
            />
            
            {/* Back to Thumbnail Button */}
            <IconButton
              onClick={() => setIsPlaying(false)}
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                },
                zIndex: 10,
              }}
            >
              ←
            </IconButton>
          </>
        )}
      </Box>

      {/* Content Section */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid xs={12} lg={8}>
            {/* Video Info Card */}
            <Card sx={{ mb: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box>
                    <Typography variant="h5" fontWeight={700} mb={2}>
                      {currentVideo.title}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip 
                        icon={<AccessTime fontSize="small" />}
                        label={currentVideo.duration}
                        size="small"
                        sx={{ bgcolor: '#f0f9ff', color: '#0369a1' }}
                      />
                      <Chip 
                        icon={<Person fontSize="small" />}
                        label={currentVideo.instructor}
                        size="small"
                        sx={{ bgcolor: '#f0f9ff', color: '#0369a1' }}
                      />
                      <Chip 
                        icon={<ThumbUp fontSize="small" />}
                        label={`${currentVideo.views.toLocaleString()} 次观看`}
                        size="small"
                        sx={{ bgcolor: '#f0f9ff', color: '#0369a1' }}
                      />
                      {currentVideo.featured && (
                        <Chip 
                          icon={<Star fontSize="small" />}
                          label="精选"
                          size="small"
                          color="primary"
                        />
                      )}
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <IconButton sx={{ border: '1px solid #e2e8f0' }}>
                      <Favorite />
                    </IconButton>
                    <IconButton sx={{ border: '1px solid #e2e8f0' }}>
                      <Bookmark />
                    </IconButton>
                    <IconButton sx={{ border: '1px solid #e2e8f0' }}>
                      <Share />
                    </IconButton>
                  </Stack>
                </Box>

                {/* Progress */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" fontWeight={600}>
                      学习进度
                    </Typography>
                    <Typography variant="body1" fontWeight={600} color="primary">
                      {currentVideo.progress}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 8,
                      bgcolor: '#f1f5f9',
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${currentVideo.progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained" 
                    size="large"
                    startIcon={<PlayArrow />}
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                      }
                    }}
                  >
                    开始学习
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    startIcon={<Bookmark />}
                    sx={{ px: 4, py: 1.5, borderColor: '#e2e8f0' }}
                  >
                    收藏课程
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="fullWidth"
                sx={{ 
                  borderBottom: '1px solid #e2e8f0',
                  '& .MuiTab-root': {
                    py: 2,
                    fontSize: '0.95rem',
                    fontWeight: 600
                  }
                }}
              >
                <Tab label="课程介绍" />
                <Tab label="课程大纲" />
                <Tab label="讨论区" />
                <Tab label="相关资源" />
              </Tabs>
              
              <Box sx={{ p: 4 }}>
                <TabPanel value={tabValue} index={0}>
                  <Typography variant="h6" fontWeight={700} mb={3}>
                    课程介绍
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#64748b', mb: 3 }}>
                    本章节将深入介绍中医护理学的基本概念和发展历程，帮助学习者建立对中医护理的整体认识。
                    通过理论讲解和实例分析，使学习者掌握中医护理的核心思想和实践方法。
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip label="基础知识" sx={{ bgcolor: '#f0f9ff', color: '#0369a1' }} />
                    <Chip label="理论学习" sx={{ bgcolor: '#f0f9ff', color: '#0369a1' }} />
                    <Chip label="入门课程" sx={{ bgcolor: '#f0f9ff', color: '#0369a1' }} />
                  </Stack>
                </TabPanel>
                
                <TabPanel value={tabValue} index={1}>
                  <Typography variant="h6" fontWeight={700} mb={3}>
                    课程大纲
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="1. 中医护理学概念与特点"
                        secondary="时长：15分钟"
                        slotProps={{ primary: { fontWeight: 600 } }}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="2. 中医护理发展简史"
                        secondary="时长：10分钟"
                        slotProps={{ primary: { fontWeight: 600 } }}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText 
                        primary="3. 中医护理与现代护理的区别"
                        secondary="时长：8分钟"
                        slotProps={{ primary: { fontWeight: 600 } }}
                      />
                    </ListItem>
                  </List>
                </TabPanel>
                
                <TabPanel value={tabValue} index={2}>
                  <Typography variant="h6" fontWeight={700} mb={3}>
                    讨论区
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b' }}>
                    暂无讨论内容，快来发表你的想法吧！
                  </Typography>
                </TabPanel>
                
                <TabPanel value={tabValue} index={3}>
                  <Typography variant="h6" fontWeight={700} mb={3}>
                    相关资源
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b' }}>
                    暂无相关资源
                  </Typography>
                </TabPanel>
              </Box>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid xs={12} lg={4}>
            <Card sx={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} mb={4}>
                  课程章节
                </Typography>
                <List sx={{ p: 0 }}>
                  {videoLessons.map((video) => (
                    <Box key={video.id}>
                      <ListItemButton
                        selected={currentVideo.id === video.id}
                        onClick={() => handleVideoSelect(video)}
                        sx={{
                          borderRadius: 2,
                          mb: 2,
                          p: 2,
                          border: currentVideo.id === video.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                          bgcolor: currentVideo.id === video.id ? '#f0f9ff' : 'transparent',
                          '&:hover': {
                            bgcolor: '#f8fafc',
                            borderColor: '#cbd5e1'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Box sx={{ position: 'relative' }}>
                            <Avatar
                              variant="rounded"
                              sx={{ 
                                width: 100, 
                                height: 56,
                                bgcolor: '#f1f5f9'
                              }}
                            >
                              <PlayArrow sx={{ color: '#64748b' }} />
                            </Avatar>
                            {video.progress > 0 && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: '3px',
                                  bgcolor: '#3b82f6',
                                  borderRadius: '0 0 4px 4px',
                                }}
                              />
                            )}
                          </Box>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                              {video.title}
                            </Typography>
                          }
                          secondary={
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Typography variant="caption" color="#64748b">
                                {video.duration}
                              </Typography>
                              {video.progress > 0 && (
                                <Typography variant="caption" color="#3b82f6" fontWeight={600}>
                                  {video.progress}%
                                </Typography>
                              )}
                            </Stack>
                          }
                        />
                      </ListItemButton>
                    </Box>
                  ))}
                </List>

                {/* Stats */}
                <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #e2e8f0' }}>
                  <Typography variant="h6" fontWeight={700} mb={3}>
                    课程统计
                  </Typography>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="#64748b">
                        总时长
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        25分钟
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="#64748b">
                        总视频数
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        1个
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="#64748b">
                        学习进度
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="#3b82f6">
                        35%
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
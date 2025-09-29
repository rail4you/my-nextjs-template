'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Button, Stack, Chip, Divider, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const CourseOverviewView: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
        Course Overview
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Complete Web Development Bootcamp
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip 
                  icon={<AccessTimeIcon />} 
                  label="12 weeks" 
                  variant="outlined" 
                  size="small" 
                />
                <Chip 
                  icon={<PeopleIcon />} 
                  label="1,234 students" 
                  variant="outlined" 
                  size="small" 
                />
                <Chip 
                  icon={<StarIcon />} 
                  label="4.8 rating" 
                  variant="outlined" 
                  size="small" 
                />
              </Stack>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                Learn to build modern web applications from scratch. This comprehensive bootcamp covers HTML, CSS, JavaScript, React, Node.js, and more.
              </Typography>
              
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  startIcon={<PlayArrowIcon />}
                  sx={{ px: 4 }}
                >
                  Start Learning
                </Button>
                <Button variant="outlined">
                  View Syllabus
                </Button>
              </Stack>
            </Box>
            
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <img 
                src="https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/a7d4a1c9-636d-406a-b49e-1d57ce5a2df6/22e5192cdf006e7e37ef57154ae5563b.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1759143347&Signature=l6RwXqLO8JcGhaU9+AYpk2XGS2c="
                alt="Course Overview"
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Course Modules
          </Typography>
          
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>1</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">HTML & CSS Fundamentals</Typography>
                <Typography variant="body2" color="text.secondary">
                  Learn the building blocks of web development
                </Typography>
              </Box>
              <Chip label="2 weeks" size="small" />
            </Box>
            
            <Divider />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>2</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">JavaScript Programming</Typography>
                <Typography variant="body2" color="text.secondary">
                  Master modern JavaScript and ES6+ features
                </Typography>
              </Box>
              <Chip label="3 weeks" size="small" />
            </Box>
            
            <Divider />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>3</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">React & Frontend Frameworks</Typography>
                <Typography variant="body2" color="text.secondary">
                  Build interactive user interfaces with React
                </Typography>
              </Box>
              <Chip label="4 weeks" size="small" />
            </Box>
            
            <Divider />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>4</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Backend Development</Typography>
                <Typography variant="body2" color="text.secondary">
                  Create server-side applications with Node.js
                </Typography>
              </Box>
              <Chip label="3 weeks" size="small" />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseOverviewView;
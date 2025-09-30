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
        课程概述
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                中医护理学
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip 
                  icon={<AccessTimeIcon />} 
                  label="9周" 
                  variant="outlined" 
                  size="small" 
                />
                <Chip 
                  icon={<PeopleIcon />} 
                  label="1 学生" 
                  variant="outlined" 
                  size="small" 
                />
                <Chip 
                  icon={<StarIcon />} 
                  label="4.8" 
                  variant="outlined" 
                  size="small" 
                />
              </Stack>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                本课程涵盖中医护理学的基础知识与实践技能，帮助学生掌握中医护理的核心理念和方法。通过理论学习与实际操作相结合，培养学生在临床护理中的综合能力。
              </Typography>
              
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  startIcon={<PlayArrowIcon />}
                  sx={{ px: 4 }}
                >
                  开始学习
                </Button>
                <Button variant="outlined">
                  查看资源
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
            课程模块
          </Typography>
          
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>1</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">绪论</Typography>
                <Typography variant="body2" color="text.secondary">
                  绪论
                </Typography>
              </Box>
              <Chip label="3周" size="small" />
            </Box>
            
            <Divider />
            
           
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>3</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">中医基本理论</Typography>
                <Typography variant="body2" color="text.secondary">
                  掌握中医基本理论知识
                </Typography>
              </Box>
              <Chip label="3周" size="small" />
            </Box>
            
            <Divider />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>4</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">中医方学知识</Typography>
                <Typography variant="body2" color="text.secondary">
                  掌握中医方学知识
                </Typography>
              </Box>
              <Chip label="3周" size="small" />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseOverviewView;
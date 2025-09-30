'use client';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  IconButton,
  Stack
} from '@mui/material';
import {
  VideoLibrary,
  Book,
  Description,
  Assessment,
  MoreVert,
  Download,
  Visibility,
  Star
} from '@mui/icons-material';

interface ResourceSummary {
  title: string;
  description: string;
  chapters: number;
  videos: number;
  documents: number;
  assessments: number;
  totalDuration: string;
  enrolledStudents: number;
  rating: number;
  instructor: {
    name: string;
    avatar: string;
  };
}

interface Chapter {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoCount: number;
  documentCount: number;
  assessmentCount: number;
}

interface ResourceItem {
  id: string;
  title: string;
  type: 'video' | 'document' | 'assessment';
  duration?: string;
  size?: string;
  questions?: number;
  status: 'completed' | 'in-progress' | 'not-started';
  lastAccessed?: string;
}

export default function ResourceView() {
  const resourceSummary: ResourceSummary = {
    title: '中医护理学',
    description: '',
    chapters: 3,
    videos: 1,
    documents: 0,
    assessments: 0,
    totalDuration: '25m',
    enrolledStudents: 1,
    rating: 4.8,
    instructor: {
      name: '白老师',
      avatar: '/assets/avatar-1.jpg'
    }
  };

  const chapters: Chapter[] = [
    { id: '1', title: '绪论', duration: '25m', completed: true, videoCount: 1, documentCount: 0, assessmentCount: 0 },
    { id: '2', title: '中医基本理论', duration: '0m', completed: false, videoCount: 0, documentCount: 0, assessmentCount: 0 },
    { id: '3', title: '方药基本知识', duration: '4h 45m', completed: false, videoCount: 8, documentCount: 0, assessmentCount: 0 },
  ];

  const resources: ResourceItem[] = [
    { id: '1', title: '绪论', type: 'video', duration: '25m', status: 'completed', lastAccessed: '2025-09-30' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <VideoLibrary />;
      case 'document': return <Description />;
      case 'assessment': return <Assessment />;
      default: return <Book />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'primary';
      case 'document': return 'secondary';
      case 'assessment': return 'warning';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'not-started': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in-progress': return '学习中';
      case 'not-started': return '未开始';
      default: return status;
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      {/* Top Summary Section */}
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4">{resourceSummary.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star sx={{ color: 'warning.main' }} />
                <Typography variant="body1">{resourceSummary.rating}</Typography>
              </Box>
            </Box>
          }
          subheader={
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {resourceSummary.description}
            </Typography>
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid xs={6} sm={3}>
                  <Typography variant="subtitle2" color="textSecondary">章节数量</Typography>
                  <Typography variant="h6">{resourceSummary.chapters}</Typography>
                </Grid>
                <Grid xs={6} sm={3}>
                  <Typography variant="subtitle2" color="textSecondary">视频数量</Typography>
                  <Typography variant="h6">{resourceSummary.videos}</Typography>
                </Grid>
                <Grid xs={6} sm={3}>
                  <Typography variant="subtitle2" color="textSecondary">文档数量</Typography>
                  <Typography variant="h6">{resourceSummary.documents}</Typography>
                </Grid>
                <Grid xs={6} sm={3}>
                  <Typography variant="subtitle2" color="textSecondary">测验数量</Typography>
                  <Typography variant="h6">{resourceSummary.assessments}</Typography>
                </Grid>
                <Grid xs={6} sm={3}>
                  <Typography variant="subtitle2" color="textSecondary">总时长</Typography>
                  <Typography variant="h6">{resourceSummary.totalDuration}</Typography>
                </Grid>
                <Grid xs={6} sm={3}>
                  <Typography variant="subtitle2" color="textSecondary">学生人数</Typography>
                  <Typography variant="h6">{resourceSummary.enrolledStudents}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={resourceSummary.instructor.avatar} alt={resourceSummary.instructor.name} />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">讲师</Typography>
                  <Typography variant="h6">{resourceSummary.instructor.name}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Sidebar - Chapter List */}
        <Card sx={{ width: 300, flexShrink: 0 }}>
          <CardHeader
            title="课程章节"
            action={
              <Typography variant="body2" color="text.secondary">
                {chapters.length} 章节
              </Typography>
            }
          />
          <CardContent sx={{ p: 0 }}>
            <List sx={{ maxHeight: 600, overflow: 'auto' }}>
              {chapters.map((chapter, index) => (
                <div key={chapter.id}>
                  <ListItem disablePadding>
                    <ListItemButton selected={chapter.id === '3'}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Typography variant="body2" color="text.secondary">
                          {index + 1}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: chapter.completed ? 'bold' : 'normal' }}>
                            {chapter.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {chapter.duration}
                          </Typography>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {chapter.completed && (
                          <Typography variant="caption" color="success.main" sx={{ fontSize: '0.7rem' }}>
                            ✓
                          </Typography>
                        )}
                        <Chip 
                          label={`${chapter.videoCount + chapter.documentCount + chapter.assessmentCount}`} 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                  {index < chapters.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Right Content - Resource Table */}
        <Card sx={{ flex: 1 }}>
          <CardHeader
            title="第3章 - JavaScript编程"
            subheader="学习JavaScript基础语法和核心概念"
            action={
              <Stack direction="row" spacing={1}>
                <Button size="small" startIcon={<Download />}>
                  下载全部
                </Button>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Stack>
            }
          />
          <CardContent>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell width={50}>#</TableCell>
                    <TableCell>资源名称</TableCell>
                    <TableCell width={100}>类型</TableCell>
                    <TableCell width={100}>时长/大小</TableCell>
                    <TableCell width={100}>状态</TableCell>
                    <TableCell width={120}>最后访问</TableCell>
                    <TableCell width={100}>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resources.map((resource, index) => (
                    <TableRow key={resource.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {resource.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getTypeIcon(resource.type)}
                          label={resource.type === 'video' ? '视频' : resource.type === 'document' ? '文档' : '测验'}
                          size="small"
                          color={getTypeColor(resource.type)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {resource.duration || resource.size || `${resource.questions}题`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusText(resource.status)}
                          size="small"
                          color={getStatusColor(resource.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {resource.lastAccessed || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}   
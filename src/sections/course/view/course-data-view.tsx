import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Chip,
  Avatar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  Stack
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Add,
  Delete,
  Search,
  FilterList,
  MoreVert,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

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
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface CourseData {
  id: string;
  title: string;
  code: string;
  description: string;
  category: string;
  level: string;
  duration: number;
  credits: number;
  status: 'active' | 'inactive' | 'draft';
  instructor: string;
  enrolled: number;
  rating: number;
  price: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function CourseDataView() {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  
  const [courseData, setCourseData] = useState<CourseData>({
    id: '1',
    title: 'Introduction to Web Development',
    code: 'WEB101',
    description: 'A comprehensive course covering the fundamentals of web development including HTML, CSS, JavaScript, and modern frameworks.',
    category: 'Web Development',
    level: 'Beginner',
    duration: 12,
    credits: 3,
    status: 'active',
    instructor: 'John Doe',
    enrolled: 245,
    rating: 4.5,
    price: 299,
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field: keyof CourseData, value: string | number) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Save logic here
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset to original data
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4">Course Data Management</Typography>
              <Chip 
                label={courseData.status.toUpperCase()} 
                color={courseData.status === 'active' ? 'success' : courseData.status === 'inactive' ? 'error' : 'default'}
              />
            </Box>
          }
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              {!editMode ? (
                <IconButton onClick={() => setEditMode(true)} color="primary">
                  <Edit />
                </IconButton>
              ) : (
                <>
                  <IconButton onClick={handleSave} color="success">
                    <Save />
                  </IconButton>
                  <IconButton onClick={handleCancel} color="error">
                    <Cancel />
                  </IconButton>
                </>
              )}
              <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
                Add Course
              </Button>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Title"
                value={courseData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Code"
                value={courseData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={courseData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                disabled={!editMode}
                variant={editMode ? "outlined" : "filled"}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={courseData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  disabled={!editMode}
                >
                  <MenuItem value="Web Development">Web Development</MenuItem>
                  <MenuItem value="Data Science">Data Science</MenuItem>
                  <MenuItem value="Mobile Development">Mobile Development</MenuItem>
                  <MenuItem value="UI/UX Design">UI/UX Design</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  value={courseData.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  disabled={!editMode}
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={courseData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  disabled={!editMode}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Content" />
          <Tab label="Students" />
          <Tab label="Analytics" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Course Details" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">Duration</Typography>
                    <Typography variant="h6">{courseData.duration} weeks</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">Credits</Typography>
                    <Typography variant="h6">{courseData.credits}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">Enrolled Students</Typography>
                    <Typography variant="h6">{courseData.enrolled}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">Rating</Typography>
                    <Typography variant="h6">{courseData.rating}/5.0</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">Price</Typography>
                    <Typography variant="h6">${courseData.price}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">Instructor</Typography>
                    <Typography variant="h6">{courseData.instructor}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Tags" />
              <CardContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {courseData.tags.map((tag, index) => (
                    <Chip key={index} label={tag} variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardHeader 
            title="Course Content" 
            action={
              <Button variant="contained" startIcon={<Add />}>
                Add Module
              </Button>
            }
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Course content management will be displayed here.
            </Typography>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardHeader title="Enrolled Students" />
          <CardContent>
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search students..."
                size="small"
                sx={{ flexGrow: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="outlined" startIcon={<FilterList />}>
                Filter
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Enrollment Date</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Alice Johnson</TableCell>
                    <TableCell>alice@example.com</TableCell>
                    <TableCell>2024-01-15</TableCell>
                    <TableCell>75%</TableCell>
                    <TableCell><Chip label="Active" color="success" size="small" /></TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardHeader title="Course Analytics" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Analytics and reporting data will be displayed here.
            </Typography>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Card>
          <CardHeader title="Course Settings" />
          <CardContent>
            <Stack spacing={3}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Allow Student Enrollment"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Show Course in Catalog"
              />
              <FormControlLabel
                control={<Switch />}
                label="Enable Discussion Forum"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Send Completion Certificates"
              />
            </Stack>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Add Course Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Fill in the course details to create a new course.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Course
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
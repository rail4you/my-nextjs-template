'use client'


import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  Stack,
  Grid,
  Paper,
  Tab,
  Tabs,
  Chip,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import { 
  Psychology as KnowledgeIcon,
  AccountTree as GraphIcon,
  Category as CategoryIcon,
  Layers as LayerIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

interface KnowledgeNode {
  id: string;
  name: string;
  category: string;
  description: string;
  level: number;
  connections: number;
  x?: number;
  y?: number;
  symbolSize?: number;
  value?: number;
}

interface KnowledgeConnection {
  source: string;
  target: string;
  type: string;
  strength: number;
}

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
      id={`knowledge-tabpanel-${index}`}
      aria-labelledby={`knowledge-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function KnowledgeView() {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [knowledgeGraph, setKnowledgeGraph] = useState<{
    nodes: KnowledgeNode[];
    connections: KnowledgeConnection[];
  }>({
    nodes: [],
    connections: []
  });

  const categories = [
    { id: 'basic', name: '基础理论', color: '#5470c6', count: 4 },
    // { id: 'diagnosis', name: '诊断方法', color: '#91cc75', count: 38 },
    // { id: 'therapy', name: '治疗技术', color: '#fac858', count: 52 },
    // { id: 'medicine', name: '药物知识', color: '#ee6666', count: 67 },
    // { id: 'nursing', name: '护理操作', color: '#73c0de', count: 41 }
  ];

  // Generate sample knowledge graph data
  useEffect(() => {
    const nodes: KnowledgeNode[] = [];
    const connections: KnowledgeConnection[] = [];
    
    // Generate nodes for each category
    categories.forEach((category, catIndex) => {
      for (let i = 0; i < category.count; i++) {
        const level = Math.floor(Math.random() * 4) + 1;
        const angle = (Math.PI * 2 * i) / category.count + catIndex * 0.8;
        const radius = 100 + Math.random() * 150 + catIndex * 30;
        
        nodes.push({
          id: `node_${category.id}_${i}`,
          name: `${category.name}知识点 ${i + 1}`,
          category: category.id,
          description: `${category.name}相关的核心知识点，包含重要的理论和实践内容。`,
          level: level,
          connections: Math.floor(Math.random() * 8) + 1,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          symbolSize: 10 + level * 3,
          value: Math.random() * 100
        });
      }
    });

    // Generate connections
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 4) + 1;
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i && Math.random() > 0.6) {
          connections.push({
            source: node.id,
            target: nodes[targetIndex].id,
            type: ['contains', 'relates', 'depends'][Math.floor(Math.random() * 3)],
            strength: Math.random()
          });
        }
      }
    });

    setKnowledgeGraph({ nodes, connections });
  }, []);

  const filteredNodes = knowledgeGraph.nodes.filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || node.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleNodeClick = (node: KnowledgeNode) => {
    setSelectedNode(node);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
  };

  const TABS = [
    {
      label: '知识图谱',
      icon: <GraphIcon />,
      value: 0
    },
    {
      label: '分类浏览',
      icon: <CategoryIcon />,
      value: 1
    },
    {
      label: '层次结构',
      icon: <LayerIcon />,
      value: 2
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            知识图谱系统
          </Typography>
          <Typography variant="body1" color="text.secondary">
            中医护理学知识体系的可视化展示与智能管理
          </Typography>
        </Box>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  bgcolor: 'primary.50', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <KnowledgeIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">知识点总数</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {knowledgeGraph.nodes.length}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  bgcolor: 'success.50', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <GraphIcon sx={{ color: 'success.main', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">知识关系</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {knowledgeGraph.connections.length}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  bgcolor: 'warning.50', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CategoryIcon sx={{ color: 'warning.main', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">知识分类</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {categories.length}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  bgcolor: 'info.50', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <LayerIcon sx={{ color: 'info.main', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">层次等级</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    4
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Card sx={{ boxShadow: 3 }}>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              {TABS.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  icon={tab.icon}
                  iconPosition="start"
                  sx={{ minHeight: 64 }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Tab Content */}
          <TabPanel value={currentTab} index={0}>
            <KnowledgeGraphView 
              nodes={filteredNodes}
              connections={knowledgeGraph.connections}
              categories={categories}
              onNodeClick={handleNodeClick}
              selectedNode={selectedNode}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <CategoryBrowser 
              categories={categories}
              nodes={filteredNodes}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              resetFilters={resetFilters}
              onNodeClick={handleNodeClick}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <HierarchyView 
              nodes={filteredNodes}
              categories={categories}
              onNodeClick={handleNodeClick}
            />
          </TabPanel>
        </Card>
      </Container>
    </Box>
  );
}

// Knowledge Graph View Component
interface KnowledgeGraphViewProps {
  nodes: KnowledgeNode[];
  connections: KnowledgeConnection[];
  categories: any[];
  onNodeClick: (node: KnowledgeNode) => void;
  selectedNode: KnowledgeNode | null;
}

const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  nodes,
  connections,
  categories,
  onNodeClick,
  selectedNode
}) => {
  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        知识图谱可视化功能正在开发中。这里将展示交互式的知识关系网络图。
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <GraphIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                知识图谱可视化
              </Typography>
              <Typography variant="body2" color="text.secondary">
                将在此处展示交互式的知识关系网络图，支持拖拽、缩放和节点详情查看
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          {selectedNode ? (
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                节点详情
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">名称</Typography>
                  <Typography variant="body1">{selectedNode.name}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">分类</Typography>
                  <Chip 
                    label={categories.find(c => c.id === selectedNode.category)?.name || selectedNode.category}
                    size="small"
                    color="primary"
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">级别</Typography>
                  <Typography variant="body1">Level {selectedNode.level}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">连接数</Typography>
                  <Typography variant="body1">{selectedNode.connections}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">描述</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedNode.description}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          ) : (
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                节点信息
              </Typography>
              <Typography variant="body2" color="text.secondary">
                点击节点查看详细信息
              </Typography>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

// Category Browser Component
interface CategoryBrowserProps {
  categories: any[];
  nodes: KnowledgeNode[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  resetFilters: () => void;
  onNodeClick: (node: KnowledgeNode) => void;
}

const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  categories,
  nodes,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  resetFilters,
  onNodeClick
}) => {
  return (
    <Box>
      {/* Search and Filter */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <SearchIcon sx={{ 
            position: 'absolute', 
            left: 12, 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'text.disabled'
          }} />
          <input
            type="text"
            placeholder="搜索知识点..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 16px 8px 40px',
              border: '1px solid #ddd',
              borderRadius: 8,
              fontSize: 14
            }}
          />
        </Box>
        <Tooltip title="重置筛选">
          <IconButton onClick={resetFilters}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Category Filter */}
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
        <Chip
          label="全部"
          onClick={() => setFilterCategory('all')}
          color={filterCategory === 'all' ? 'primary' : 'default'}
          variant={filterCategory === 'all' ? 'filled' : 'outlined'}
        />
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={`${category.name} (${category.count})`}
            onClick={() => setFilterCategory(category.id)}
            color={filterCategory === category.id ? 'primary' : 'default'}
            variant={filterCategory === category.id ? 'filled' : 'outlined'}
          />
        ))}
      </Stack>

      {/* Results */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        找到 {nodes.length} 个知识点
      </Typography>

      <Grid container spacing={2}>
        {nodes.slice(0, 20).map((node) => (
          <Grid item xs={12} sm={6} md={4} key={node.id}>
            <Card 
              sx={{ 
                p: 2, 
                cursor: 'pointer',
                '&:hover': { boxShadow: 3 }
              }}
              onClick={() => onNodeClick(node)}
            >
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {node.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip 
                    label={`Level ${node.level}`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip 
                    label={`${node.connections} 连接`}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {node.description}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Hierarchy View Component
interface HierarchyViewProps {
  nodes: KnowledgeNode[];
  categories: any[];
  onNodeClick: (node: KnowledgeNode) => void;
}

const HierarchyView: React.FC<HierarchyViewProps> = ({
  nodes,
  categories,
  onNodeClick
}) => {
  const nodesByLevel = [1, 2, 3, 4].map(level => 
    nodes.filter(node => node.level === level)
  );

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        层次结构视图展示了知识点的层级关系，从基础概念到专业技能的递进关系。
      </Alert>

      <Stack spacing={3}>
        {nodesByLevel.map((levelNodes, index) => (
          <Box key={index}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Level {index + 1}: 
              {index === 0 && ' 基础概念'}
              {index === 1 && ' 核心理论'}
              {index === 2 && ' 应用方法'}
              {index === 3 && ' 专业技能'}
            </Typography>
            
            <Grid container spacing={2}>
              {levelNodes.slice(0, 8).map((node) => (
                <Grid item xs={12} sm={6} md={3} key={node.id}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      cursor: 'pointer',
                      borderLeft: 4,
                      borderColor: categories.find(c => c.id === node.category)?.color || 'primary.main',
                      '&:hover': { boxShadow: 3 }
                    }}
                    onClick={() => onNodeClick(node)}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {node.name}
                      </Typography>
                      <Chip 
                        label={categories.find(c => c.id === node.category)?.name || node.category}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
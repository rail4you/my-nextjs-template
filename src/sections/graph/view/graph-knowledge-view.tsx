import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Box, Paper, Typography, Chip, Stack, Card, CardContent, Divider } from '@mui/material';

const GraphKnowledgeView = () => {
  const chartRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // Generate graph data
    const categories = [
      { name: '包含关系', itemStyle: { color: '#5470c6' } },
      { name: '属序关系', itemStyle: { color: '#91cc75' } },
      { name: '相关关系', itemStyle: { color: '#fac858' } }
    ];

    const nodes = [];
    const links = [];
    const nodeCount = { 0: 171, 1: 37, 2: 148 };

    // Generate nodes for each category
    Object.keys(nodeCount).forEach((categoryIndex) => {
      const count = nodeCount[categoryIndex];
      const category = parseInt(categoryIndex);
      
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + category * 0.5;
        const radius = 150 + Math.random() * 200 + category * 50;
        
        nodes.push({
          id: `node_${category}_${i}`,
          name: `知识点 ${category * 200 + i + 1}`,
          category: category,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          symbolSize: 8 + Math.random() * 6,
          value: Math.random() * 100,
          label: {
            show: false
          }
        });
      }
    });

    // Generate links
    nodes.forEach((node, i) => {
      const linkCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < linkCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i && Math.random() > 0.7) {
          links.push({
            source: node.id,
            target: nodes[targetIndex].id,
            lineStyle: {
              opacity: 0.3,
              width: 0.5
            }
          });
        }
      }
    });

    const option = {
      backgroundColor: '#f5f5f5',
      tooltip: {
        formatter: (params) => {
          if (params.dataType === 'node') {
            return `${params.data.name}<br/>类别: ${categories[params.data.category].name}<br/>权重: ${params.data.value.toFixed(2)}`;
          }
          return '';
        }
      },
      legend: [{
        data: categories.map(c => c.name),
        orient: 'vertical',
        left: 10,
        top: 20,
        textStyle: {
          fontSize: 14
        }
      }],
      animation: true,
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        type: 'graph',
        layout: 'none',
        data: nodes,
        links: links,
        categories: categories,
        roam: true,
        label: {
          show: false,
          position: 'right',
          formatter: '{b}',
          fontSize: 10
        },
        labelLayout: {
          hideOverlap: true
        },
        emphasis: {
          focus: 'adjacency',
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold'
          },
          lineStyle: {
            width: 3,
            opacity: 0.8
          }
        },
        lineStyle: {
          color: 'source',
          curveness: 0.1,
          opacity: 0.3
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 6]
      }]
    };

    chartInstance.setOption(option);

    // Handle click events
    chartInstance.on('click', (params) => {
      if (params.dataType === 'node') {
        setSelectedNode({
          name: params.data.name,
          category: categories[params.data.category].name,
          value: params.data.value.toFixed(2),
          connections: links.filter(
            l => l.source === params.data.id || l.target === params.data.id
          ).length
        });
      }
    });

    const handleResize = () => chartInstance.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, []);

  return (
    <Box sx={{ p: 3, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          知识图谱可视化
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">知识关系</Typography>
            <Typography variant="h6">369 个</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">关系类型</Typography>
            <Typography variant="h6">3 种</Typography>
          </Box>
          <Box>
            {/* <Typography variant="body2" color="text.secondary">跨模块关系</Typography>
            <Typography variant="h6">18 个</Typography> */}
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Chip label="包含关系: 0" color="primary" size="small" />
          <Chip label="顺序关系: 0" color="success" size="small" />
          <Chip label="相关关系: 369" color="warning" size="small" />
        </Stack>
      </Paper>

      <Stack direction="row" spacing={2} sx={{ height: 'calc(100vh - 280px)' }}>
        <Paper 
          ref={chartRef} 
          elevation={3} 
          sx={{ 
            flex: 1, 
            height: '100%',
            minHeight: 600
          }} 
        />
        
        {selectedNode && (
          <Card sx={{ width: 280, height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                节点详情
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" color="text.secondary">名称</Typography>
                  <Typography variant="body1">{selectedNode.name}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">关系类型</Typography>
                  <Typography variant="body1">{selectedNode.category}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">权重值</Typography>
                  <Typography variant="body1">{selectedNode.value}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">连接数</Typography>
                  <Typography variant="body1">{selectedNode.connections}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>

      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          提示：拖拽可平移视图，滚轮可缩放，点击节点查看详情，悬停节点高亮关联关系
        </Typography>
      </Paper>
    </Box>
  );
};

export default GraphKnowledgeView;
'use client';

import { useState } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Iconify } from 'src/components/iconify';
import { ChartLine } from 'src/sections/_examples/extra/chart-view/chart-line';
import { ChartBar } from 'src/sections/_examples/extra/chart-view/chart-bar';
import { ChartPie } from 'src/sections/_examples/extra/chart-view/chart-pie';
import LayerView from './layer-view';
import GraphTreeView from './graph-tree-view';
import GraphCircleView from './graph-circle-view';
import GraphKnowledgeView from './graph-knowledge-view';

const TABS = [
  {
    value: 'layer',
    label: '知识图谱',
    icon: <Iconify width={20} icon="solar:atom-bold-duotone" />,
  },
  {
    value: 'tree map',
    label: '树图',
    icon: <Iconify width={20} icon="solar:share-bold" />,
  },
  {
    value: 'circle map',
    label: '环图',
    icon: <Iconify width={20} icon="solar:clock-circle-bold" />,
  },
  {
    value: 'knowledge map',
    label: '层次结构图',
    icon: <Iconify width={20} icon="solar:add-folder-bold" />,
  },
];

interface GraphViewProps { }

export function GraphView({ }: GraphViewProps) {
  const [currentTab, setCurrentTab] = useState('layer');

  const renderTabContent = () => {
    switch (currentTab) {
      case 'layer':
        return <LayerView />;
      case 'tree map':
        return <GraphTreeView />;
      case 'circle map':
        return <GraphCircleView />
      case 'knowledge map':
        return <GraphKnowledgeView />
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', bgcolor: 'background.default' }}>
        {renderTabContent()}
      </Box>
    </Box>
  );
}

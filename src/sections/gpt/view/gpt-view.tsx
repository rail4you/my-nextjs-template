'use client';
import React, { useState } from 'react';
import { CopilotChat } from "@copilotkit/react-ui";
import { Box, Tabs, Tab, Card, CardContent, Typography, Grid, Chip } from '@mui/material';

interface Tool {
    id: string;
    title: string;
    description: string;
    usage: string;
    icon: string;
    category: string;
}

const GptView: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const aiTools: Tool[] = [
        {
            id: '1',
            title: '智能出题助手',
            description: '智能生成各类题目，涵盖选择题、填空题、简答题等多种题型',
            usage: '智能生成各类题目，涵盖选择题、填空题、简答题等多种题型',
            icon: '💻',
            category: '学习'
        },
        {
            id: '2',
            title: '智能数据分析',
            description: '智能数据分析',
            usage: '智能数据分析',
            icon: '📊',
            category: 'Analytics'
        },
        {
            id: '3',
            title: '智能文本总结',
            description: '智能总结文本',
            usage: '智能总结文本',
            icon: '📄',
            category: 'Productivity'
        },
    ];

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    pl: 2
                }}
            >
                <Tab label="AI问答助手" />
                <Tab label="AI工具" />
            </Tabs>
            
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                {activeTab === 0 && (
                    <Box sx={{ height: '100%' }}>
                        <CopilotChat
                            instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
                            labels={{
                                title: "Your Assistant",
                                initial: "Hi! 👋 How can I assist you today?",
                            }}
                        />
                    </Box>
                )}
                
                {activeTab === 1 && (
                    <Box sx={{ p: 3, overflow: 'auto', height: '100%' }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            AI工具
                        </Typography>
                        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
                            {aiTools.map((tool) => (
                                <Grid xs={12} sm={6} md={4} key={tool.id}>
                                    <Card 
                                        sx={{ 
                                            height: '100%', 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            '&:hover': {
                                                boxShadow: 4,
                                                transform: 'translateY(-2px)',
                                                transition: 'all 0.2s ease-in-out'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Typography variant="h2" sx={{ mr: 2 }}>
                                                    {tool.icon}
                                                </Typography>
                                                <Box>
                                                    <Typography variant="h6" component="div">
                                                        {tool.title}
                                                    </Typography>
                                                    <Chip 
                                                        label={tool.category} 
                                                        size="small" 
                                                        variant="outlined"
                                                        sx={{ mt: 0.5 }}
                                                    />
                                                </Box>
                                            </Box>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary" 
                                                sx={{ mb: 2 }}
                                            >
                                                {tool.description}
                                            </Typography>
                                            <Box sx={{ mt: 'auto' }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    <strong>Usage:</strong> {tool.usage}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default GptView;
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const GraphCircleView = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const data = {
      name: '中医护理学',
      itemStyle: {
        color: '#1e3a8a',
        borderWidth: 3,
        borderColor: '#1e40af'
      },
      symbolSize: 50,
      label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e3a8a'
      },
      children: [
        {
          name: '中医基本理论',
          itemStyle: {
            color: '#ef4444',
            borderWidth: 2.5
          },
          symbolSize: 35,
          label: {
            fontSize: 15,
            fontWeight: 600,
            color: '#1e3a8a'
          },
          children: [
            {
              name: '精、气、血、津液', 
              itemStyle: { color: '#f87171', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13 , color: '#1e3a8a'}
            },
            { 
              name: '阴阳学说', 
              itemStyle: { color: '#f87171', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13 , color: '#1e3a8a'}
            },
               { 
              name: '五行学说', 
              itemStyle: { color: '#f87171', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13 , color: '#1e3a8a'}
            },
                   { 
              name: '辨证', 
              itemStyle: { color: '#f87171', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13 , color: '#1e3a8a'}
            },

                     { 
              name: '辨证', 
              itemStyle: { color: '#f87171', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13 , color: '#1e3a8a'}
            },
               { 
              name: '阴阳学说', 
              itemStyle: { color: '#f87171', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13 ,color: '#1e3a8a' }
            }
            
            
          ]
        },
        {
          name: '绪论',
          itemStyle: { 
            color: '#f87171',
            borderWidth: 2.5
          },
          symbolSize: 35,
          label: {
            fontSize: 15,
            fontWeight: 600,
            color: '#1e3a8a'
          },
          children: [
            { 
              name: '中医护理学的发展简史', 
              itemStyle: { color: '#fca5a5', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            }
          ]
        },
        {
          name: '中医基本理论',
          itemStyle: { 
            color: '#ec4899',
            borderWidth: 2.5
          },
          symbolSize: 35,
          label: {
            fontSize: 15,
            fontWeight: 600,
            color: '#1e3a8a'
          },
          children: [
            { 
              name: '阴阳学说', 
              itemStyle: { color: '#f9a8d4', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '五行学说', 
              itemStyle: { color: '#f9a8d4', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13 }
            },
            { 
              name: '藏象学说', 
              itemStyle: { color: '#f9a8d4', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '精、气、血、津液', 
              itemStyle: { color: '#f9a8d4', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '病因病机', 
              itemStyle: { color: '#f9a8d4', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '四诊', 
              itemStyle: { color: '#f9a8d4', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '辨证', 
              itemStyle: { color: '#f9a8d4', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            }
          ]
        },
        {
          name: '方药基本知识',
          itemStyle: { 
            color: '#8b5cf6',
            borderWidth: 2.5
          },
          symbolSize: 35,
          label: {
            fontSize: 15,
            fontWeight: 600,
            color: '#1e3a8a'
          },
          children: [
            { 
              name: '中药基本知识', 
              itemStyle: { color: '#a78bfa', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a' }
            },
            { 
              name: '方剂基本知识', 
              itemStyle: { color: '#a78bfa', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a' }
            }
          ]
        },
        {
          name: '经络腧穴基本知识',
          itemStyle: { 
            color: '#6366f1',
            borderWidth: 2.5
          },
          symbolSize: 35,
          label: {
            fontSize: 15,
            fontWeight: 600,
            color: '#1e3a8a'
          },
          children: [
            { 
              name: '经络基本知识', 
              itemStyle: { color: '#818cf8', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '腧穴基本知识', 
              itemStyle: { color: '#818cf8', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            }
          ]
        },
        {
          name: '中医护理基本知识',
          itemStyle: { 
            color: '#0ea5e9',
            borderWidth: 2.5
          },
          symbolSize: 35,
          label: {
            fontSize: 15,
            fontWeight: 600,
            color: '#1e3a8a'
          },
          children: [
            { 
              name: '起居护理', 
              itemStyle: { color: '#38bdf8', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            }
          ]
        },
        {
          name: '常用中医护理技术',
          itemStyle: { 
            color: '#14b8a6',
            borderWidth: 2.5
          },
          symbolSize: 35,
          label: {
            fontSize: 15,
            fontWeight: 600,
            color: '#1e3a8a'
          },
          children: [
            { 
              name: '中药保留灌肠法', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a' }
            },
            { 
              name: '贴敷法', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '熏洗法', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '中药涂药', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '热熨法', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '中药熏蒸', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '中药冷敷', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13 }
            },
            { 
              name: '穴位敷贴', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '中药泡洗', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '中药湿热敷', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13 }
            },
            { 
              name: '蜡疗', 
              itemStyle: { color: '#2dd4bf', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            }
          ]
        },
        {
          name: '中医养生保健与康复护理',
          itemStyle: { 
            color: '#10b981',
            borderWidth: 2.5
          },
          symbolSize: 35,
          label: {
            fontSize: 15,
            fontWeight: 600,
            color: '#1e3a8a'
          },
          children: [
            { 
              name: '中医康复护理', 
              itemStyle: { color: '#34d399', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '传统运动养生', 
              itemStyle: { color: '#34d399', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            },
            { 
              name: '中医养生保健', 
              itemStyle: { color: '#34d399', borderWidth: 2 },
              symbolSize: 20,
              label: { fontSize: 13, color: '#1e3a8a'}
            }
          ]
        }
      ]
    };

    const option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: '{b}',
        backgroundColor: 'rgba(0,0,0,0.8)',
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        borderColor: 'transparent'
      },
      series: [
        {
          type: 'tree',
          data: [data],
          top: '10%',
          bottom: '10%',
          left: '10%',
          right: '10%',
          layout: 'radial',
          symbol: 'circle',
          symbolSize: 7,
          initialTreeDepth: 3,
          animationDurationUpdate: 750,
          orient: 'LR',
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
            fontSize: 13,
            color: '#1f2937',
            distance: 10
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.15)'
          },
          lineStyle: {
            color: '#d1d5db',
            width: 2,
            curveness: 0.5,
            shadowBlur: 5,
            shadowColor: 'rgba(0,0,0,0.1)'
          },
          emphasis: {
            focus: 'descendant',
            scale: 1.1,
            itemStyle: {
              shadowBlur: 15,
              shadowColor: 'rgba(0,0,0,0.3)'
            },
            lineStyle: {
              width: 3,
              color: '#9ca3af'
            }
          }
        }
      ]
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            中医护理学
          </h1>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-2xl h-full flex flex-col">
          <div 
            ref={chartRef} 
            className="flex-1 w-full"
            style={{ minHeight: '700px' }}
          />
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-b-xl border-t">
            <p className="text-center text-sm text-gray-600">
              💡 点击节点可展开/收起分支 | 鼠标悬停查看详情 | 放射状布局
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphCircleView;
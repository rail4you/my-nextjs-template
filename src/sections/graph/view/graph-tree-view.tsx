import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const GraphTreeView = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [
            {
              name: '中医基本理论',
              children: [
                {
                  name: '精、气、血、津液',
                  value: 35,
                  itemStyle: {
                    color: '#7c3aed',
                    borderColor: '#7c3aed'
                  },
                  label: {
                    backgroundColor: '#7c3aed',
                    borderRadius: 20,
                    padding: [10, 20],
                    color: '#fff',
                    fontSize: 14
                  },
                  children: [
                    {
                      name: '精',
                      itemStyle: { color: '#e0e7ff' },
                      label: {
                        backgroundColor: '#e0e7ff',
                        color: '#5b21b6',
                        fontSize: 12,
                        padding: [6, 12],
                        borderRadius: 12
                      }
                    },
                           {
                      name: '气',
                      itemStyle: { color: '#e0e7ff' },
                      label: {
                        backgroundColor: '#e0e7ff',
                        color: '#5b21b6',
                        fontSize: 12,
                        padding: [6, 12],
                        borderRadius: 12
                      }
                    },
                                  {
                      name: '血',
                      itemStyle: { color: '#e0e7ff' },
                      label: {
                        backgroundColor: '#e0e7ff',
                        color: '#5b21b6',
                        fontSize: 12,
                        padding: [6, 12],
                        borderRadius: 12
                      }
                    },
                                  {
                      name: '津液',
                      itemStyle: { color: '#e0e7ff' },
                      label: {
                        backgroundColor: '#e0e7ff',
                        color: '#5b21b6',
                        fontSize: 12,
                        padding: [6, 12],
                        borderRadius: 12
                      }
                    },
                    
                  ]
                },
                {
                  name: '阴阳学说',
                  value: 24,
                  itemStyle: {
                    color: '#3b82f6',
                    borderColor: '#3b82f6'
                  },
                  label: {
                    backgroundColor: '#3b82f6',
                    borderRadius: 20,
                    padding: [10, 20],
                    color: '#fff',
                    fontSize: 14
                  },
                  children: [
                    {
                      name: '阴阳的基本概念与基本特性',
                      itemStyle: { color: '#dbeafe' },
                      label: {
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        fontSize: 12,
                        padding: [6, 12],
                        borderRadius: 12
                      }
                    }
                  ]
                },
                {
                  name: '中医护理基本知识',
                  value: 35,
                  itemStyle: {
                    color: '#0ea5e9',
                    borderColor: '#0ea5e9'
                  },
                  label: {
                    backgroundColor: '#0ea5e9',
                    borderRadius: 20,
                    padding: [10, 20],
                    color: '#fff',
                    fontSize: 14
                  },
                  children: [
                    {
                      name: '知识模块',
                      itemStyle: { color: '#e0f2fe' },
                      label: {
                        backgroundColor: '#e0f2fe',
                        color: '#075985',
                        fontSize: 12,
                        padding: [6, 12],
                        borderRadius: 12
                      }
                    }
                  ]
                },
                {
                  name: '五行学说',
                  value: 24,
                  itemStyle: {
                    color: '#10b981',
                    borderColor: '#10b981'
                  },
                  label: {
                    backgroundColor: '#10b981',
                    borderRadius: 20,
                    padding: [10, 20],
                    color: '#fff',
                    fontSize: 14
                  },
                  children: [
                    {
                      name: '五行学说的基本概念与特性',
                      itemStyle: { color: '#d1fae5' },
                      label: {
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        fontSize: 12,
                        padding: [6, 12],
                        borderRadius: 12
                      }
                    }
                  ]
                },
                {
                  name: '辨证',
                  value: 35,
                  itemStyle: {
                    color: '#059669',
                    borderColor: '#059669'
                  },
                  label: {
                    backgroundColor: '#059669',
                    borderRadius: 20,
                    padding: [10, 20],
                    color: '#fff',
                    fontSize: 14
                  },
                  children: [
                    {
                      name: '八纲辨证',
                      itemStyle: { color: '#d1fae5' },
                      label: {
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        fontSize: 12,
                        padding: [6, 12],
                        borderRadius: 12
                      }
                    }
                  ]
                }
              ],
              itemStyle: {
                color: '#1e293b',
                borderColor: '#1e293b'
              },
              label: {
                backgroundColor: '#1e293b',
                borderRadius: 20,
                padding: [12, 24],
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold'
              }
            }
          ],
          top: '5%',
          left: '10%',
          bottom: '5%',
          right: '20%',
          symbolSize: 12,
          orient: 'LR',
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          lineStyle: {
            color: '#cbd5e1',
            width: 2
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
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">中医护理学知识图谱</h1>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded"></span>
              <span>重点: 35</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded"></span>
              <span>难点: 24</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded"></span>
              <span>实操/训练: 1</span>
            </div>
          </div>
        </div>
        <div 
          ref={chartRef} 
          className="w-full bg-white rounded-xl shadow-lg"
          style={{ height: 'calc(100vh - 180px)' }}
        />
      </div>
    </div>
  );
};

export default GraphTreeView
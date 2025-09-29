'use client'

import { Card, CardContent, Typography } from "@mui/material"
import { ChartBar } from "src/sections/_examples/extra/chart-view/chart-bar"

export function GraphTreeView() {
  return (
          <Card sx={{ m: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>网络关系图</Typography>
              <ChartBar
                chart={{
                  categories: ['课程', '能力', '问题', '知识'],
                  series: [1, 15, 50, 300],
                }}
              />
            </CardContent>
          </Card>
  )
}   
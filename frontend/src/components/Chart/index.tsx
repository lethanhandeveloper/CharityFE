import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [0, 0, 0, 0, 0, 0, 0];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];
export interface CustomBarChartProps {
  labels: string[];
  data: number[];
}
export default function CustomBarChart(props: CustomBarChartProps) {
  console.log(props);
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        {
          data: pData,
          label: 'pv',
          id: 'pvId',
          yAxisKey: 'leftAxisId',
        },
        {
          data: uData,
          label: 'uv',
          id: 'uvId',
          yAxisKey: 'rightAxisId',
        },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
      yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
      rightAxis='rightAxisId'
      sx={{
        '.MuiChartsAxis-right': {
          display: 'none',
        },
        '.MuiChartsAxis-left': {
          display: 'none',
        },
        '.MuiChartsAxis-tick': {
          display: 'none',
        },
        '.MuiBarElement-series-pvId': {
          borderRadius: '20px',
        },
      }}
    />
  );
}

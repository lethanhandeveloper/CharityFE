/* eslint-disable no-mixed-operators */
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

import ReactApexChart from 'react-apexcharts';
import Search, { ChartStructure } from '@components/Chart/calculateChart';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Container } from '@mui/material';
import campaign from '@services/ethers/campaign';
import { mapHistoryContracts } from '@mapdata/contract';
import { HistoryContractUI } from '@models/contract';
type ChartType = 'User' | 'Campaign';
const MonthlyBarChart = ({
  type,
  isLine,
  id,
}: {
  type: ChartType;
  isLine: boolean;
  id: string;
}) => {
  const theme = useTheme();
  const [rootList, setRootList] = useState<HistoryContractUI[]>([]);
  const [data, setData] = useState<{
    startDate: Date;
    endDate: Date;
    searchData: ChartStructure[];
  }>({
    startDate: new Date(),
    endDate: new Date(),
    searchData: [],
  });

  const info = theme.palette.info.light;
  useEffect(() => {
    setData({ ...data, searchData: Search(data.startDate, data.endDate, rootList) });
  }, [data.startDate, data.endDate, rootList]);
  useEffect(() => {
    const initData = async () => {
      if (type === 'User') {
        const user = await campaign.getHistoryByUser(id);
        setRootList(mapHistoryContracts(user));
      }
    };
    initData();
  }, [type, isLine, id]);
  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <DatePicker
          onChange={(e) => {
            setData({ ...data, startDate: e ? new Date(e.toString()) : new Date() });
          }}
        />
        <DatePicker
          onChange={(e) => setData({ ...data, endDate: e ? new Date(e.toString()) : new Date() })}
        />
      </Box>
      <ReactApexChart
        options={{
          chart: {
            type: 'bar',
            height: 365,
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
              borderRadius: 4,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: data.searchData.map((item) => item.name),
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          grid: {
            show: false,
          },
          colors: [info],
          tooltip: {
            theme: 'light',
          },
          stroke: {
            curve: 'smooth',
          },
        }}
        series={[
          {
            data: data.searchData.map((item) => item.value),
          },
        ]}
        type={isLine ? 'line' : 'bar'}
        height={365}
      />
    </Container>
  );
};

export default MonthlyBarChart;

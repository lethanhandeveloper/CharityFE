/* eslint-disable no-mixed-operators */
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import Search, { ChartStructure } from './calculateData';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Box, Container } from '@mui/material';
import campaign from '@services/ethers/campaign';
import { mapHistoryContracts } from '@services/mapdata/contract';
import { HistoryContractUI } from '@models/contract';
type ChartType = 'User' | 'Campaign';
const MonthlyBarChart = ({
  type,
  isLine,
  id,
  startDate,
  endDate,
}: {
  type: ChartType;
  isLine: boolean;
  id: string;
  startDate: Date;
  endDate: Date;
}) => {
  const theme = useTheme();
  const [rootList, setRootList] = useState<HistoryContractUI[]>([]);
  const [data, setData] = useState<{
    startDate: Date;
    endDate: Date;
    searchData: ChartStructure[];
  }>({
    startDate: startDate,
    endDate: endDate,
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
      } else {
        const user = await campaign.getHistoryByCampaign(id);
        setRootList(mapHistoryContracts(user));
      }
    };
    initData();
  }, [type, isLine, id]);
  return (
    <Container>
      {data.searchData.length > 0 && (
        <>
          <Box
            sx={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <DemoContainer components={['DateRangePicker']}>
              <DateRangePicker
                localeText={{ start: 'Check-in', end: 'Check-out' }}
                autoFocus={true}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    startDate: new Date(e[0] as string),
                    endDate: new Date(e[1] as string),
                  });
                }}
              />
            </DemoContainer>
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
        </>
      )}
    </Container>
  );
};

export default MonthlyBarChart;

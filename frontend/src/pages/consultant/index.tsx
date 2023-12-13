import { Facebook, LinkedIn, YouTube } from '@mui/icons-material';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import MonthlyBarChart from './bar';
import { useParams } from 'react-router';
import CampaignTable from './campaignTable';
import serviceAPI from '@services/api';
import { useEffect, useState } from 'react';

const DetailAccount = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>();

  useEffect(() => {
    const initData = async () => {
      if (id) {
        const data = await serviceAPI.auth.getRequestByUserId(id);
        if (data.data.result.type === 1) {
          setData({
            ...data.data.result.commitInfoVerification,
            ...data.data.result.personalGeneralInfo,
          });
        }
      }
    };
    initData();
  }, []);
  return (
    <Grid container>
      <Grid
        item
        xs={4}
      ></Grid>
      <Grid
        item
        xs={8}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
          <Avatar
            src={data?.logo}
            sx={{
              width: '120px',
              height: '120px',
            }}
          />

          <Container>
            <Typography>Tên: {data?.clubName}</Typography>
            <Typography>Mô tả: {data?.goalName}</Typography>
            <Typography>Tham gia từ: {data?.startDate}</Typography>
            <Typography>{data?.actionDescSocialLink}</Typography>
            <Typography>{data?.socialNetworkLink}</Typography>
          </Container>
        </Box>
        <Box
          gap={2}
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
        >
          <Facebook sx={{ height: 40, width: 40 }} />
          <YouTube sx={{ height: 40, width: 40 }} />
          <LinkedIn sx={{ height: 40, width: 40 }} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <MonthlyBarChart />
      </Grid>
      <Grid
        item
        xs={12}
      >
        {id && <CampaignTable id={id} />}
      </Grid>
    </Grid>
  );
};
export default DetailAccount;

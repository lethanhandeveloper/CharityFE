import { Facebook, LinkedIn, YouTube } from '@mui/icons-material';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MonthlyBarChart from '../../components/Chart';
import { useParams } from 'react-router';
import CampaignTable from './campaignTable';
import serviceAPI from '@services/api';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';

const DetailAccount = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initData = async () => {
      try {
        if (id) {
          const data = await serviceAPI.auth.getRequestByUserId(id);
          if (data.data.result.type === 1) {
            setData({
              ...data.data.result.commitInfoVerification,
              ...data.data.result.personalGeneralInfo,
            });
          }
        }
      } catch (e) {
        dispatch(
          setInfoAlert({
            open: true,
            title: 'Tài khoản chưa đăng ký quyền cộng tác viên',
            type: 'info',
          }),
        );
      }
    };
    initData();
  }, []);
  return (
    <Grid
      container
      style={{
        backgroundColor: 'white',
        padding: '30px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Box>
          <Avatar
            src={data?.logo}
            sx={{
              width: '120px',
              height: '120px',
            }}
          />
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
        </Box>

        <Box>
          <Typography>Tên nhóm/tổ chức: {data?.clubName}</Typography>
          <Typography>Mô tả: {data?.goalName}</Typography>
          <Typography>Tham gia từ: {data?.startDate}</Typography>
          <Typography>Tên người đại diện {data?.name}</Typography>
          <Typography>Địa chỉ: {data?.address}</Typography>
          <Typography>Email tổ chức: {data?.representativeEmail}</Typography>
        </Box>
      </Box>

      <Grid
        item
        xs={12}
      >
        <MonthlyBarChart
          isLine={false}
          type='User'
          id={data?.userId}
        />
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

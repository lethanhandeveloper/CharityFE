/* eslint-disable @typescript-eslint/no-unused-vars */
import PropTypes from 'prop-types';
import { Box, Typography, Card, Avatar, CardContent, Divider, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Text from '@common/Text';
import { UserUI } from 'models/user';
import Upload from '@services/firebase';
import EditInfoDialog from './EditInfo';
import { useState } from 'react';
import serviceAPI from '@services/api';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Can from '@caslConfig/can';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`,
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`,
);

interface ProfileCoverProps {
  user: UserUI;
}
const ProfileCover = (props: ProfileCoverProps) => {
  const { user } = props;
  const [data, setData] = useState<UserUI>(user);
  const dispatch = useAppDispatch();
  const handleUpdateAvatar = async (url: string) => {
    try {
      const response = await serviceAPI.auth.updateAvatar(url);
      setData({ ...data, imageUrl: url });
      dispatch(setInfoAlert({ open: true, title: response.data.message, type: 'success' }));
    } catch (errors) {
      dispatch(setInfoAlert({ open: false, title: 'Không thể cập nhật!', type: 'error' }));
    }
  };
  return (
    <>
      <CardCover>
        <Card>
          <Box
            padding={'6px'}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Box>
              <Typography
                variant='h4'
                gutterBottom
              >
                Thông tin cá nhân
              </Typography>
            </Box>
            <Can
              I='update'
              an='UserProfile'
            >
              {user && <EditInfoDialog data={user} />}
            </Can>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant='subtitle2'>
              <Grid
                container
                spacing={0}
              >
                <Grid xs={2}></Grid>
                <Grid
                  item
                  xs={5}
                  textAlign={{ sm: 'right' }}
                >
                  <Box
                    pr={3}
                    pb={2}
                  >
                    Họ và tên:
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={5}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Can
                      I='view'
                      an='UserProfile'
                    >
                      <CheckCircleIcon style={{ color: 'blue' }} />
                    </Can>
                    <Text color='black'>
                      <b>{data.fullname}</b>
                    </Text>
                  </Box>
                </Grid>
                <Grid xs={2}></Grid>
                <Grid
                  item
                  xs={5}
                  textAlign={{ sm: 'right' }}
                >
                  <Box
                    pr={3}
                    pb={2}
                  >
                    Tuổi:
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={5}
                >
                  <Text color='black'>
                    <b>{data.age}</b>
                  </Text>
                </Grid>
                <Grid xs={2}></Grid>
                <Grid
                  item
                  xs={5}
                  textAlign={{ sm: 'right' }}
                >
                  <Box
                    pr={3}
                    pb={2}
                  >
                    Địa chỉ:
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={5}
                >
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color='black'>
                      {data.province} - {data.district} - {data.commune}
                      {data.specificAddress}
                    </Text>
                  </Box>
                </Grid>
                <Grid xs={2}></Grid>
                <Grid
                  item
                  xs={5}
                  textAlign={{ sm: 'right' }}
                >
                  <Box
                    pr={3}
                    pb={2}
                  >
                    Số điện thoại:
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={5}
                >
                  <Text color='black'>{data.phoneNumber}</Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </CardCover>
      <AvatarWrapper>
        <Avatar
          variant='rounded'
          alt={data.fullname}
          src={data.imageUrl}
        />
        <Upload
          className='image'
          setUrl={(url: string) => {
            handleUpdateAvatar(url);
          }}
          type='image/*'
          folder='avatar'
        />
      </AvatarWrapper>
      <Box
        py={2}
        pl={2}
        mb={3}
      >
        <Typography
          sx={{ py: 2 }}
          variant='subtitle2'
          color='text.primary'
        ></Typography>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems='center'
          justifyContent='space-between'
        ></Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired,
};

export default ProfileCover;

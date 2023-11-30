/* eslint-disable @typescript-eslint/no-unused-vars */
import PropTypes from 'prop-types';
import { Box, Typography, Card, Avatar, CardContent, Divider, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Text from '@common/Text';
import { UserUI } from '@services/models/user';
import Upload from '@services/firebase';
import EditInfoDialog from './EditInfo';
import { useState } from 'react';
import serviceAPI from '@services/api';

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

  const handleUpdateAvatar = async (url: string) => {
    await serviceAPI.auth.updateAvatar(url);
  };
  return (
    <>
      <CardCover>
        <Card>
          <Box
            p={3}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Box>
              <Typography
                variant='h4'
                gutterBottom
              >
                Personal Details
              </Typography>
              <Typography variant='subtitle2'>
                Manage informations related to your personal details
              </Typography>
            </Box>
            {user && <EditInfoDialog data={user} />}
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
                    Name:
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={5}
                >
                  <Text color='black'>
                    <b>{user.fullname}</b>
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
                    Ages:
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={5}
                >
                  <Text color='black'>
                    <b>{user.age}</b>
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
                    Address:
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={5}
                >
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color='black'>
                      {user.province} - {user.district} - {user.specificAddress}
                    </Text>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </CardCover>
      <AvatarWrapper>
        <Avatar
          variant='rounded'
          alt={user.fullname}
          src={user.imageUrl}
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

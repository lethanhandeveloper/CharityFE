import { Helmet } from 'react-helmet-async';

import { Grid, Container } from '@mui/material';

import ProfileCover from './components/ProfileCover';
import RecentActivity from './components/RecentActivity';

import { useEffect, useState } from 'react';
import serviceAPI from '@services/api';
import { UserUI } from '@services/models/user';
import { mapUserUI } from '@services/mapdata/user';

const ManagementUserProfile = () => {
  const [user, setUserData] = useState<UserUI>();

  useEffect(() => {
    const initData = async () => {
      try {
        const response = await serviceAPI.auth.getProfile();
        setUserData(mapUserUI(response.data.result));
      } catch (error) {
        console.log(error);
      }
    };
    initData();
  }, []);
  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container
        sx={{ mt: 3 }}
        maxWidth='lg'
      >
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='stretch'
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={8}
          >
            {user && <ProfileCover user={user} />}
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <RecentActivity />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ManagementUserProfile;

import { Helmet } from 'react-helmet-async';

import { Grid, Container, Card, Box, Typography, CardContent, Divider } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import PopularTags from './PopularTags';
import Text from '@common/Text';
import { useEffect, useState } from 'react';
import serviceAPI from '@services/api';
import { UserUI } from '@services/models/user';
import { mapUserUI } from '@services/mapdata/user';
import EditInfoDialog from './EditInfo';

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
          <Grid
            item
            xs={8}
          >
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
                <EditInfoDialog />
              </Box>
              <Divider />
              <CardContent sx={{ p: 4 }}>
                <Typography variant='subtitle2'>
                  <Grid
                    container
                    spacing={0}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
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
                      xs={12}
                      sm={8}
                      md={9}
                    >
                      <Text color='black'>
                        <b>Craig Donin</b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box
                        pr={3}
                        pb={2}
                      >
                        Date of birth:
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={8}
                      md={9}
                    >
                      <Text color='black'>
                        <b>15 March 1977</b>
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
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
                      xs={12}
                      sm={8}
                      md={9}
                    >
                      <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                        <Text color='black'>
                          1749 High Meadow Lane, SEQUOIA NATIONAL PARK, California, 93262
                        </Text>
                      </Box>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <PopularTags />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ManagementUserProfile;

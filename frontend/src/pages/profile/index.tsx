import { Helmet, HelmetProvider } from 'react-helmet-async';

import {
  Grid,
  Container,
  Card,
  Box,
  Typography,
  Button,
  CardContent,
  Divider,
} from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import PopularTags from './PopularTags';
import Text from '@common/Text';
import { EditTwoTone } from '@mui/icons-material';
const ManagementUserProfile = () => {
  const user = {
    savedCards: 7,
    name: 'Catherine Pike',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: 'Web Developer',
    location: 'Barcelona, Spain',
    followers: '465',
  };

  return (
    <>
      <HelmetProvider>
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
              <ProfileCover user={user} />
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
                  <Button
                    variant='text'
                    startIcon={<EditTwoTone />}
                  >
                    Edit
                  </Button>
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
      </HelmetProvider>
    </>
  );
};

export default ManagementUserProfile;

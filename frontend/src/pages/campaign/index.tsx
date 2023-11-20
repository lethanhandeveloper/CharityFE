import {
  Box,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  IconButton,
  Button,
  CardActions,
  Link,
  Grid,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import Text from '@common/Text';
import React from 'react';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `,
);

function CampainPage() {
  return (
    <React.Fragment>
      <Card>
        <CardHeader
          avatar={<Avatar src='/static/images/avatars/5.jpg' />}
          action={
            <IconButton color='primary'>
              <MoreHorizTwoToneIcon fontSize='medium' />
            </IconButton>
          }
          titleTypographyProps={{ variant: 'h4' }}
          subheaderTypographyProps={{ variant: 'subtitle2' }}
          title='Allison Lipshutz'
          subheader={
            <>
              Managing Partner,{' '}
              <Link
                href='#'
                underline='hover'
              >
                #software
              </Link>
              ,{' '}
              <Link
                href='#'
                underline='hover'
              >
                #managers
              </Link>
              , Google Inc.
            </>
          }
        />
        <Box
          px={3}
          pb={2}
        >
          <Typography
            variant='h4'
            fontWeight='normal'
          >
            Welcome to organizing your remote office for maximum productivity.
          </Typography>
        </Box>
        <CardMedia
          sx={{ minHeight: 280 }}
          image='/static/images/placeholders/covers/6.jpg'
          title='Card Cover'
        />
        <Box p={3}>
          <Typography
            variant='h2'
            sx={{ pb: 1 }}
          >
            Organizing Your Remote Office for Maximum Productivity
          </Typography>
          <Typography variant='subtitle2'>
            <Link
              href='#'
              underline='hover'
            >
              example.com
            </Link>{' '}
            • 4 mins read
          </Typography>
        </Box>
        <Divider />
        <CardActionsWrapper
          sx={{
            display: { xs: 'block', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Button
              startIcon={<ThumbUpAltTwoToneIcon />}
              variant='contained'
            >
              Like
            </Button>
            <Button
              startIcon={<CommentTwoToneIcon />}
              variant='outlined'
              sx={{ mx: 2 }}
            >
              Comment
            </Button>
            <Button
              startIcon={<ShareTwoToneIcon />}
              variant='outlined'
            >
              Share
            </Button>
          </Box>
          <Box sx={{ mt: { xs: 2, md: 0 } }}>
            <Typography
              variant='subtitle2'
              component='span'
            >
              <Text color='black'>
                <b>485</b>
              </Text>{' '}
              reactions •{' '}
              <Text color='black'>
                <b>63</b>
              </Text>{' '}
              comments
            </Typography>
          </Box>
        </CardActionsWrapper>
      </Card>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
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
                  Account Settings
                </Typography>
                <Typography variant='subtitle2'>Manage details related to your account</Typography>
              </Box>
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
                      Language:
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={9}
                  >
                    <Text color='black'>
                      <b>English (US)</b>
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
                      Timezone:
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={9}
                  >
                    <Text color='black'>
                      <b>GMT +2</b>
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
                      Account status:
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={9}
                  ></Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
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
                  Email Addresses
                </Typography>
                <Typography variant='subtitle2'>
                  Manage details related to your associated email addresses
                </Typography>
              </Box>
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
                      Email ID:
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={9}
                  >
                    <Text color='black'>
                      <b>example@demo.com</b>
                    </Text>
                    <Box
                      pl={1}
                      component='span'
                    ></Box>
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
                      Email ID:
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={9}
                  >
                    <Text color='black'>
                      <b>demo@example.com</b>
                    </Text>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CampainPage;

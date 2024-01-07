import { Card, Grid, Box, CardContent, Typography, Avatar, alpha, styled } from '@mui/material';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`,
);

function Wallets({ data }: { data: any }) {
  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          pb: 3,
        }}
      >
        <Typography variant='h3'>Chiến dịch</Typography>
      </Box>
      <Grid
        container
        spacing={3}
      >
        <Grid
          xs={12}
          sm={6}
          md={3}
          item
        >
          <Card
            sx={{
              px: 1,
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <img
                  alt='BTC'
                  src='/static/images/placeholders/logo/bitcoin.png'
                />
              </AvatarWrapper>
              <Typography
                variant='h5'
                noWrap
              >
                Đợi duyệt
              </Typography>
              <Typography
                variant='subtitle1'
                noWrap
              >
                {data?.campaignCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
          item
        >
          <Card
            sx={{
              px: 1,
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <img
                  alt='Ripple'
                  src='/static/images/placeholders/logo/ripple.png'
                />
              </AvatarWrapper>
              <Typography
                variant='h5'
                noWrap
              >
                Đang diễn ra
              </Typography>
              <Typography
                variant='subtitle1'
                noWrap
              >
                {data?.campaignInMonth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          xs={12}
          sm={6}
          md={3}
          item
        >
          <Card
            sx={{
              px: 1,
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <img
                  alt='Cardano'
                  src='/static/images/placeholders/logo/cardano.png'
                />
              </AvatarWrapper>
              <Typography
                variant='h5'
                noWrap
              >
                Đã kết thúc
              </Typography>
              <Typography
                variant='subtitle1'
                noWrap
              >
                {data?.campaignFinishCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Wallets;

import { Helmet } from 'react-helmet-async';

import PageTitleWrapper from '@components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';

import { useEffect, useState } from 'react';
import serviceAPI from '@services/api';

function DashboardCrypto() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const initData = async () => {
      const response = await serviceAPI.common.getDataHome();
      setData(response.data.result);
    };
    initData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Thống kê</title>
      </Helmet>
      <PageTitleWrapper></PageTitleWrapper>
      <Container maxWidth='lg'>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='stretch'
          spacing={4}
        >
          <Grid
            item
            xs={12}
          >
            <AccountBalance data={data} />
          </Grid>
          <Grid
            item
            lg={12}
            xs={12}
          >
            <Wallets data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DashboardCrypto;

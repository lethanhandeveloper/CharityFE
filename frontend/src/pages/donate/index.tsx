import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import data from '../home/data';
import ProgressCustom from '@common/Progess';
import TableRender from '@components/Table';
import SearchField from '@common/SearchField';
const DonatePage = () => {
  const [detail, setDetail] = useState(data.CardCampaign[0]);
  useEffect(() => {
    setDetail(data.CardCampaign[0]);
  }, []);
  return (
    <React.Fragment>
      <Grid
        container
        spacing={5}
        padding={'20px'}
      >
        <Grid
          item
          xs={8}
        >
          <img
            src={detail.imageUrl}
            style={{
              height: '500px',
              width: '100%',
              borderRadius: '20px',
            }}
          />
        </Grid>
        <Grid
          item
          xs={4}
        >
          <div
            style={{
              border: '1px solid #eee',
              boxShadow: '0 0.026667rem 0.133333rem 0 rgba(0,0,0,.05)',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, textAlign: 'left' }}>
              <img
                src={detail.imageUrl}
                style={{
                  width: '55px',
                  height: '55px',
                  border: '2px solid #f54a00',
                  borderRadius: '50%',
                  padding: '3px',
                }}
              />
              <div>
                <Typography>Tiền ủng hộ được chuyển đến</Typography>
                <Typography fontWeight={'bold'}>{detail.createdBy}</Typography>
              </div>
            </Box>

            <Divider style={{ marginTop: '5px', marginBottom: '5px' }} />
            <Typography>
              Đã đạt được <span style={{ color: '#f54a00' }}>{detail.count}</span>{' '}
              <b> {detail.percent}%</b>
            </Typography>
            <ProgressCustom value={detail.percent} />
            <Box sx={{ display: 'flex', gap: 2, textAlign: 'left' }}>
              <Typography
                fontSize={'13px'}
                color={'#999'}
              >
                Của mục tiêu {detail.target}
              </Typography>
              <Typography
                fontSize={'13px'}
                color={'#999'}
              >
                {detail.totalUser} người đã ủng hộ
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                style={{
                  color: '#f54a00',
                  borderRadius: '20px',
                  border: '1px solid #f54a00',
                  padding: '5px 25px 5px 25px',
                }}
              >
                Chia sẻ
              </Button>
              <Button
                style={{
                  color: 'white',
                  padding: '5px 25px 5px 25px',
                  borderRadius: '20px',
                  border: '1px solid #f54a00',
                  background: '#f54a00',
                }}
              >
                Ủng hộ
              </Button>
            </Box>
          </div>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            boxShadow: '0px 1px 16px 0px #00000026',
          }}
        >
          <SearchField />
          <TableRender />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default DonatePage;

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import ProgressCustom from '@common/Progess';
import TableRender from '@components/Table';

import { useParams } from 'react-router';
import serviceAPI from '@services/api';
import { mapCampain } from '@mapdata/campain';
import { CampainUI } from '@models/campain';
import parse from 'html-react-parser';
import campaign from '@services/ethers/campaign';

const DonatePage = () => {
  const { id } = useParams();

  const [detail, setDetail] = useState<CampainUI>();

  useEffect(() => {
    const initData = async () => {
      if (id) {
        const response = await serviceAPI.campain.getCampainDetail(id);
        if (response.status === 200) {
          setDetail(mapCampain(response.data.result));
        }
      }
    };
    initData();
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
            src={detail?.thumbnail}
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
          <Box
            sx={{
              border: '1px solid #eee',
              boxShadow: '0 0.026667rem 0.133333rem 0 rgba(0,0,0,.05)',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, textAlign: 'left' }}>
              <img
                src={detail?.thumbnail}
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
                <Typography fontWeight={'bold'}>{detail?.creatorId}</Typography>
              </div>
            </Box>

            <Divider style={{ marginTop: '5px', marginBottom: '5px' }} />
            <Typography
              fontSize={'18px'}
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              Đã đạt được <span style={{ color: '#f54a00' }}>{detail?.targetValue}</span>
              <b> {50}%</b>
            </Typography>
            <ProgressCustom value={50} />
            <Box
              sx={{
                display: 'flex',
                gap: 2,

                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                fontSize={'13px'}
                color={'#999'}
              >
                Của mục tiêu {detail?.targetValue}
              </Typography>
              <Typography
                fontSize={'13px'}
                color={'#999'}
              >
                953 người đã ủng hộ
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
                onClick={() => {
                  if (detail) {
                    campaign.addNew(detail);
                    campaign.setHistoryAddress();
                  }
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
                onClick={() => {
                  if (detail) campaign.donateCampaign(detail?.id, 200);
                }}
              >
                Ủng hộ
              </Button>
            </Box>
          </Box>
          <Box> {parse(detail?.description || '')}</Box>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            boxShadow: '0px 1px 16px 0px #00000026',
          }}
        >
          <TableRender />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default DonatePage;

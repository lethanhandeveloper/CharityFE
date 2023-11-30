import { Box, Button, Divider, Grid, InputAdornment, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ProgressCustom from '@common/Progess';
import TableRender from '@components/Table';
import { SearchInputWrapper } from '@layout/Header/SearchBox';
import { useParams } from 'react-router';
import serviceAPI from '@services/api';
import { mapCampain } from '@services/mapdata/campain';
import { CampainUI } from '@services/models/campain';
// import EthereumComponent from '@services/ethers';
import ProductSaleComponent from '@services/ethers/tesst';

const DonatePage = () => {
  const { id } = useParams();
  const [openMetaMask, setOpenMetaMask] = useState<boolean>(false);
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
        marginBottom={'40px'}
      >
        {openMetaMask && <ProductSaleComponent />}
      </Grid>

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
                  setOpenMetaMask(true);
                }}
              >
                Ủng hộ
              </Button>
            </Box>
          </Box>
          <Box>
            <span>{detail?.description}</span>
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            boxShadow: '0px 1px 16px 0px #00000026',
          }}
        >
          <SearchInputWrapper
            autoFocus={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            placeholder='Search terms here...'
            fullWidth
            label='Search'
          />
          <TableRender />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default DonatePage;

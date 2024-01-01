import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import ProgressCustom from '@common/Progess';
// import TableRender from '@components/Table';

import { useParams } from 'react-router';
import serviceAPI from '@services/api';
import { mapCampain } from '@mapdata/campain';
import { CampainUI } from '@models/campain';
import parse from 'html-react-parser';
import campaign from '@services/ethers/campaign';
import { CampaignContractUI } from '@models/contract';
import { mapCampainContract } from '@mapdata/contract';
import TableRender from '@components/Table';
import DialogContentText from '@mui/material/DialogContentText';
import { ButtonCancel, ButtonConfirm } from '@common/Button';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';

export const calculatePercent = (number1: number, number2: number) =>
  Math.floor((number1 / number2) * 100).toFixed(2);
const DonatePage = () => {
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);
  const [detail, setDetail] = useState<CampainUI>();
  const [campaignContract, setCampaign] = useState<CampaignContractUI>();
  const [countDonate, setCoutDonate] = useState<{ countUser: number; countDonate: number }>({
    countUser: 0,
    countDonate: 0,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initData = async () => {
      try {
        if (id) {
          const response = await serviceAPI.campain.getCampainDetail(id);
          if (response.status === 200) {
            setDetail(mapCampain(response.data.result));
          }
          const contract = await campaign.getCampainDetail(id);
          if (contract) {
            setCampaign(mapCampainContract(contract));
          }
        }
      } catch (err) {
        dispatch(setInfoAlert({ open: true, title: 'Hệ thống đang lỗi!', type: 'error' }));
      }
    };
    if (id) initData();
  }, [id]);
  const handleDonate = async () => {
    setOpenDialog(false);
    if (detail) {
      const check = await campaign.donateCampaign(
        detail?.id,
        number,
        localStorage.getItem('userId') || 'anonymous',
      );
      if (check) {
        dispatch(setInfoAlert({ open: true, title: 'Giao dịch thành công', type: 'success' }));
      } else {
        dispatch(setInfoAlert({ open: true, title: 'Giao dịch thất bại', type: 'error' }));
      }
    }
  };
  return (
    <React.Fragment>
      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
          }}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Nhập số tiền muốn ủng hộ'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <TextField
                type='number'
                onChange={(e) => {
                  setNumber(parseFloat(e.target.value));
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <ButtonCancel
                onClick={() => {
                  setOpenDialog(false);
                }}
                autoFocus
              >
                Đóng
              </ButtonCancel>
              <ButtonConfirm onClick={handleDonate}>Chuyển</ButtonConfirm>
            </Box>
          </DialogActions>
        </Dialog>
      )}
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
              Đã đạt được <span style={{ color: '#f54a00' }}>{campaignContract?.donateValue}</span>.
              Số dư còn lại{' '}
              <span style={{ color: '#f54a00' }}>{campaignContract?.currentValue}</span>
              <b>
                {calculatePercent(
                  campaignContract?.currentValue || 0,
                  campaignContract?.targetValue || 1,
                )}
                %
              </b>
            </Typography>
            <ProgressCustom
              variant='determinate'
              sx={{ height: '10px', borderRadius: '10px' }}
              value={parseFloat(
                calculatePercent(
                  campaignContract?.currentValue || 0,
                  campaignContract?.targetValue || 1,
                ),
              )}
            />
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
                Của mục tiêu {campaignContract?.targetValue.toLocaleString()}
              </Typography>
              <Typography
                fontSize={'13px'}
                color={'#999'}
              >
                {countDonate.countUser} người đã ủng hộ
              </Typography>
              <Typography
                fontSize={'13px'}
                color={'#999'}
              >
                {countDonate.countDonate} lượt ủng hộ
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
              {(detail?.endDate?.getTime() || 0) > new Date().getTime() && (
                <Button
                  style={{
                    color: 'white',
                    padding: '5px 25px 5px 25px',
                    borderRadius: '20px',
                    border: '1px solid #f54a00',
                    background: '#f54a00',
                  }}
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                >
                  Ủng hộ
                </Button>
              )}
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
          {id && (
            <TableRender
              id={id}
              isCampaign={true}
              setCount={(a, b) => {
                setCoutDonate({ countDonate: b, countUser: a });
              }}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default DonatePage;

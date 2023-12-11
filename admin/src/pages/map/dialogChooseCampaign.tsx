import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Avatar, Box, TextField, Typography } from '@mui/material';
import serviceAPI from '@services/api';
import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch } from '@store/hook';
import { CampainUI } from '@models/campain';
import { mapCampainUIs } from '@services/mapdata/campain';

interface DialogChooseCampaignProps {
  lat: number;
  long: number;
  campaignId?: string;
  open: boolean;
  id?: string;
  handleClose: () => void;
}
export default function DialogChooseCampaign(props: DialogChooseCampaignProps) {
  const [campaignList, setCampaignList] = React.useState<CampainUI[]>([]);
  const [campaign, setCampaign] = React.useState<string>('');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const initData = async () => {
      const response = await serviceAPI.campain.getCampaignList();
      setCampaignList(mapCampainUIs(response.data.result));
    };
    initData();
  }, []);

  const create = async () => {
    try {
      const response = await serviceAPI.map.create({
        lat: props.lat,
        long: props.long,
        campaignId: campaign,
        type: '1',
      });
      if (response.status === 200) {
        dispatch(
          setInfoAlert({ title: 'Ghi điểm thiện nguyện thành công!', open: true, type: 'success' }),
        );
      } else {
        dispatch(
          setInfoAlert({ title: 'Không thể tạo thực hiện thao tác!', open: true, type: 'error' }),
        );
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Hệ thống lỗi!', open: true, type: 'error' }));
    }
  };
  const update = async () => {
    try {
      const response = await serviceAPI.map.update({
        lat: props.lat,
        long: props.long,
        campaignId: campaign,
        type: '1',
        id: props.id,
      });
      if (response.status === 200) {
        dispatch(setInfoAlert({ title: 'Tạo banner thành công!', open: true, type: 'success' }));
      } else {
        dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Chọn chiến dịch'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Autocomplete
              id='country-select-demo'
              sx={{ width: 300 }}
              options={campaignList}
              autoHighlight
              onChange={(e, value) => setCampaign(value?.id || '')}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option) => (
                <Box
                  component='li'
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <Avatar src={option.thumbnail} />
                  <Typography>{option.title}</Typography>
                  <Typography>{option.endDate.toString()}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Choose a campaign'
                />
              )}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Đóng</Button>
          {props.id ? (
            <Button
              onClick={update}
              autoFocus
            >
              Cập nhật
            </Button>
          ) : (
            <Button
              onClick={create}
              autoFocus
            >
              Tạo mới
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

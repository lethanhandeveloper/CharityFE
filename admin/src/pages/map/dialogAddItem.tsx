import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch } from '@store/hook';
import { Autocomplete, Avatar, Box, TextField, Typography } from '@mui/material';
import serviceAPI from '@services/api';
import { UserUI } from '@models/user';
import { mapUsersUI } from '@services/mapdata/user';
import { DatePicker } from '@mui/x-date-pickers';

interface DialogChooseCampaignProps {
  campaignId?: string;
  open: boolean;
  handleClose: () => void;
}
interface ItemContractStructure {
  creatorId?: string;
  message?: string;
  time?: Date;
  campaignId?: string;
}
export default function DialogChooseCampaign(props: DialogChooseCampaignProps) {
  const [itemContract, setItemContract] = React.useState<ItemContractStructure>();
  const [userList, setUserList] = React.useState<UserUI[]>([]);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const initData = async () => {
      try {
        const response = await serviceAPI.auth.getUserList();
        setUserList(mapUsersUI(response.data.reuslt));
      } catch (err) {
        console.log(err);
      }
    };
    initData();
  });
  const addItem = async () => {
    try {
      console.log('addItem');
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Hệ thống lỗi!', open: true, type: 'error' }));
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
              options={userList}
              autoHighlight
              onChange={(e, value) => setItemContract({ ...itemContract, creatorId: value?.id })}
              getOptionLabel={(option) => option.email}
              renderOption={(props, option) => (
                <Box
                  component='li'
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <Avatar src={option.imageUrl} />
                  <Typography>{option.fullname}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Người quyên góp'
                />
              )}
            />
            <TextField
              rows={4}
              onChange={(e) => {
                setItemContract({ ...itemContract, message: e.target.value });
              }}
            />
            <DatePicker
              sx={{ width: 260 }}
              label={'Ngày quyên góp'}
              disableFuture
              onChange={(e) => setItemContract({ ...itemContract, time: e })}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Đóng</Button>
          <Button
            onClick={addItem}
            autoFocus
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

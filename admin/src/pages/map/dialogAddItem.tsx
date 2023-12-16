import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch } from '@store/hook';
import { Autocomplete, Avatar, Box, Grid, TextField, Typography } from '@mui/material';
import serviceAPI from '@services/api';
import { UserUI } from '@models/user';
import { mapUsersUI } from '@services/mapdata/user';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import campaign from '@services/ethers/campaign';

interface DialogAddItemProps {
  campaignId?: string;
  open: boolean;
  handleClose: () => void;
}
interface ItemContractStructure {
  creatorId: string;
  message: string;
  time: Date;
  campaignId: string;
}
export default function DialogAddItem(props: DialogAddItemProps) {
  const [itemContract, setItemContract] = React.useState<ItemContractStructure>({
    campaignId: '',
    creatorId: '',
    message: '',
    time: new Date(),
  });
  const [userList, setUserList] = React.useState<UserUI[]>([]);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const initData = async () => {
      try {
        const response = await serviceAPI.auth.getUserList();
        setUserList(mapUsersUI(response.data.result));
      } catch (err) {
        console.log(err);
      }
    };
    if (props.open) initData();
  }, [props.open]);
  const addItem = async () => {
    try {
      await campaign.addItem(
        props.campaignId || '',
        itemContract?.creatorId || '',
        itemContract?.message || '',
      );
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
            <Grid
              container
              gap={2}
            >
              <Grid
                item
                xs={12}
              >
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  gap={2}
                  justifyContent={'space-between'}
                >
                  <Autocomplete
                    id='country-select-demo'
                    sx={{ width: 260 }}
                    options={userList}
                    autoHighlight
                    onChange={(e, value) =>
                      setItemContract({ ...itemContract, creatorId: value?.id || '' })
                    }
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
                  <DatePicker
                    sx={{ width: 260 }}
                    label={'Ngày quyên góp'}
                    disableFuture
                    onChange={(e) => {
                      console.log(e);
                    }}
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
              >
                <TextField
                  rows={4}
                  fullWidth
                  minRows={4}
                  onChange={(e) => {
                    setItemContract({ ...itemContract, message: e.target.value || '' });
                  }}
                />
              </Grid>
            </Grid>
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

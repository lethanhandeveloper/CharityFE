import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';

import serviceAPI from '@services/api';
import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch } from '@store/hook';

interface DialogInfoMapProps {
  lat: number;
  long: number;
  campaignId?: string;
}
export default function DialogInfoMap(props: DialogInfoMapProps) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const create = async () => {
    try {
      const response = await serviceAPI.map.create({ lat: props.lat });
      if (response.status === 200) {
        dispatch(setInfoAlert({ title: 'Tạo banner thành công!', open: true, type: 'success' }));
      } else {
        dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
    }
  };
  const update = async () => {
    try {
      const response = await serviceAPI.map.update({});
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
      <Button
        variant='outlined'
        onClick={handleClickOpen}
      >
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Select campaign'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography>//title</Typography>
            <Grid container>
              <Grid
                item
                xs={12}
              >
                //Số người tham gia
              </Grid>
              <Grid
                item
                xs={12}
              >
                //số tiền đạt được - số tiền mong muốn
              </Grid>
              <Grid
                item
                xs={12}
              >
                //thời gian kết thúc
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={create}
            autoFocus
          >
            Agree
          </Button>
          <Button
            onClick={update}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

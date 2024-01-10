import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import serviceAPI from '@services/api';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  );
});

export default function DialogChangePass() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<any>();

  const dispatch = useAppDispatch();
  const handleChangePass = async () => {
    const check = await serviceAPI.auth.changePassword(code);
    if (check.data.result) {
      dispatch(
        setInfoAlert({ open: true, title: 'Thay đổi mật khẩu thành công', type: 'success' }),
      );
      setOpen(false);
    } else {
      dispatch(setInfoAlert({ open: true, title: 'Thay đổi mật khẩu thất bại', type: 'error' }));
    }
  };
  return (
    <React.Fragment>
      <Typography
        onClick={() => {
          setOpen(true);
        }}
      >
        Bạn quên mật khẩu
      </Typography>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Xác thực email'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Typography>Email:</Typography>
            <Grid container>
              <TextField
                size='small'
                type='email'
                fullWidth
                onChange={(e) => {
                  setCode({ ...code, email: e.target.value });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => {
                          serviceAPI.auth.sendEmail(code.email);
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Typography>Nhập mã xác thực:</Typography>
            <Grid container>
              <TextField
                size='small'
                fullWidth
                onChange={(e) => {
                  setCode({ ...code, code: e.target.value });
                }}
              />
            </Grid>
            <Typography>Nhập mật khẩu mới:</Typography>
            <Grid container>
              <TextField
                size='small'
                fullWidth
                type='password'
                onChange={(e) => {
                  setCode({ ...code, password: e.target.value });
                }}
              />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePass}>Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

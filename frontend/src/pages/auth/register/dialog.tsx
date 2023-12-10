import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Grid, TextField, Typography } from '@mui/material';

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

export default function ConfirmCode({
  handleSubmit,
  handleClose,
  open,
}: {
  handleSubmit: (code: string) => void;
  handleClose: () => void;
  open: boolean;
}) {
  const [code, setCode] = React.useState<string>('');
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Xác thực email'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Typography>Nhập mã code xác thực:</Typography>
            <Grid container>
              <TextField
                size='small'
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleSubmit(code);
              handleClose();
            }}
          >
            Xác thực
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

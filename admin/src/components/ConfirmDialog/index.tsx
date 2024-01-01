import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, TextField } from '@mui/material';

export default function ConfirmDialog({
  title,
  message,
  onSucess,
  buttonText,
}: {
  title: string;
  message: string;
  buttonText: string;
  onSucess: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant='contained'
        onClick={handleClickOpen}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='outlined'
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleClose();
              onSucess();
            }}
            autoFocus
            variant='contained'
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export function ConfirmDialogIcon({
  title,
  message,
  onSucess,
  icon,
  setMessage,
}: {
  title: string;
  message: string;
  onSucess: () => void;
  icon: React.ReactNode;
  setMessage: (message: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>{icon}</IconButton>
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {message} <br />
            Mô tả lý do đồng ý/ từ chối
          </DialogContentText>

          <TextField
            fullWidth
            name='title'
            minRows={4}
            maxRows={4}
            multiline={true}
            rows={4}
            size='small'
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='outlined'
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleClose();
              onSucess();
            }}
            autoFocus
            variant='contained'
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

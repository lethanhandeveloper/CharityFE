import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormConfirm({
  title,
  message,
  onSave,
  buttonText,
}: {
  title: string;
  message: string;
  onSave: () => void;
  buttonText: string;
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
        variant='outlined'
        onClick={handleClickOpen}
      >
        {buttonText}
      </Button>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            type='email'
            fullWidth
            variant='standard'
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
              onSave();
              handleClose();
            }}
            variant='contained'
          >
            Gửi yêu cầu
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

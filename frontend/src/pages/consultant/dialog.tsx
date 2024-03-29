import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Upload from '@services/firebase';
import { Box } from '@mui/material';

export default function FormConfirm({
  title,
  message,
  onSave,
  buttonText,
  setData,
  data,
}: {
  title: string;
  message: string;
  onSave: () => void;
  buttonText: string;
  setData: (data: any) => void;
  data: any;
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
            name='message'
            onChange={(e) => {
              setData({ ...data, message: e.target.value });
            }}
            fullWidth
            variant='standard'
          />
          <DialogContentText>Số tiền muốn rút:</DialogContentText>
          <TextField
            autoFocus
            type='number'
            margin='dense'
            onChange={(e) => {
              setData({ ...data, number: e.target.value });
            }}
            fullWidth
            variant='standard'
          />
          <DialogContentText>File xác thực</DialogContentText>
          <Box sx={{ position: 'relative' }}>
            <Upload
              folder='file'
              className='file'
              setUrl={(url) => {
                setData({ ...data, url });
              }}
              type='application/pdf'
            />
          </Box>
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

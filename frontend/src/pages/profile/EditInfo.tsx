import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EditTwoTone } from '@mui/icons-material';
import { Grid, MenuItem } from '@mui/material';
// import { UserUI } from '@services/models/user';

const EditInfoDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState<any>();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleUpdateProfile = () => {
    console.log(userData);
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        variant='text'
        startIcon={<EditTwoTone />}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Cập nhật thông tin</DialogTitle>
        <DialogContent>
          <DialogContentText>Hệ thống cập nhật thông tin chi tiết</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Họ và tên'
            type='fullname'
            fullWidth
            variant='standard'
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Số điện thoại'
            fullWidth
            variant='standard'
          />
          <TextField
            id='standard-select-currency'
            label='Giới tính'
            select
            fullWidth
            variant='standard'
          >
            {[
              { value: 'male', label: 'Name' },
              { value: 'female', label: 'Nữ' },
            ].map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={4}
            >
              <TextField
                id='standard-select-currency'
                label='Tỉnh'
                select
                fullWidth
                variant='standard'
              >
                {[
                  { value: 'male', label: 'Name' },
                  { value: 'female', label: 'Nữ' },
                ].map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <TextField
                id='standard-select-currency'
                label='Huyện'
                select
                fullWidth
                variant='standard'
              >
                {[
                  { value: 'male', label: 'Name' },
                  { value: 'female', label: 'Nữ' },
                ].map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <TextField
                id='standard-select-currency'
                label='Xã'
                select
                fullWidth
                variant='standard'
              >
                {[
                  { value: 'male', label: 'Name' },
                  { value: 'female', label: 'Nữ' },
                ].map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleUpdateProfile}>Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default EditInfoDialog;

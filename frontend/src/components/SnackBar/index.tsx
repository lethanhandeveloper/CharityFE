import { useEffect, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch, useAppSelector } from '@store/hook';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant='filled'
      {...props}
    />
  );
});

export default function AlertSnackbar() {
  const alertRedux = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setInfoAlert({ title: '', open: false, type: 'error' }));
  };
  useEffect(() => {
    console.log(alertRedux, 'get');
  }, [alertRedux]);
  return (
    <Stack
      spacing={2}
      sx={{ width: '100%' }}
    >
      <Snackbar
        open={alertRedux.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity={alertRedux.type}
          onClose={handleClose}
        >
          {alertRedux.title}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

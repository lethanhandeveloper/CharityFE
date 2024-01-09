import {
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import serviceAPI from '@services/api';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';
import ConfirmCode from '@pages/auth/register/dialog';
import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch } from '@store/hook';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
interface CommonFormProps {
  setData: (data: any) => void;
  data: any;
}

const CommonForm = (props: CommonFormProps) => {
  const { data, setData } = props;
  const dispatch = useAppDispatch();
  const [open, setOpenDialog] = useState<boolean>();
  const [verify, setVerify] = useState<boolean>();
  const [helperText, setHelperText] = useState<string>('');
  const checkLinkExistence = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setHelperText('');
      } else {
        setHelperText('Website không tồn tại');
      }
    } catch (error: any) {
      setHelperText('Website không tồn tại');
    }
  };
  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
    if (event.target.name === 'actionDescSocialLink') {
      checkLinkExistence(event.target.value);
    }
  };
  const handleVerify = async (code: string) => {
    const check = await serviceAPI.auth.validateEmail(data?.representativeEmail, code);
    if (check) {
      setVerify(true);
      dispatch(setInfoAlert({ open: true, title: 'Xác thực email thành công', type: 'success' }));
    } else {
      dispatch(setInfoAlert({ open: true, title: 'Xác thực email thất bại', type: 'error' }));
    }
  };
  return (
    <>
      <Grid
        container
        sx={{
          padding: '0 60px 0',
        }}
      >
        {open && (
          <ConfirmCode
            handleClose={() => setOpenDialog(false)}
            handleSubmit={(code) => {
              handleVerify(code);
            }}
            open={open}
          />
        )}

        <Grid
          item
          xs={12}
        >
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Tên tổ chức
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            value={data?.name}
            fullWidth
            name='name'
            variant='standard'
          />

          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Địa chỉ
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            value={data?.address}
            fullWidth
            name='address'
            variant='standard'
          />

          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Mạng xã hội
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            value={data?.actionDescSocialLink}
            name='actionDescSocialLink'
            variant='standard'
            helperText={helperText}
          />

          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Email:
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            value={data?.representativeEmail}
            name='representativeEmail'
            variant='standard'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  {verify ? (
                    <TaskAltIcon color='success' />
                  ) : (
                    <IconButton
                      onClick={() => {
                        serviceAPI.auth.sendEmail(data.representativeEmail);
                        setOpenDialog(true);
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='type'
            value={data?.type || '2'}
            onChange={handleChange}
          >
            <FormControlLabel
              value='1'
              control={<Radio />}
              label='Cá nhân'
            />
            <FormControlLabel
              value='2'
              control={<Radio />}
              label='Tổ chức'
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </>
  );
};
export default CommonForm;

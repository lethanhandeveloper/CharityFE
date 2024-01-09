import {
  Avatar,
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { DateCalendar } from '@mui/x-date-pickers';
import Upload from '@services/firebase';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';
import serviceAPI from '@services/api';
import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch } from '@store/hook';
import ConfirmCode from '@pages/auth/register/dialog';

interface PersonalFormProps {
  setData: (data: any) => void;
  data: any;
}

const PersonalForm = (props: PersonalFormProps) => {
  const { data, setData } = props;
  const [helperText, setHelperText] = useState<string>('');
  const [open, setOpenDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [verify, setVerify] = useState<boolean>(false);
  const checkLinkExistence = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors', // Ensure the request is treated as a CORS request
        headers: {
          'Content-Type': 'application/json',
          // You can add other headers as needed
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
    if (event.target.name === 'socialNetworkLink') {
      checkLinkExistence(event.target.value);
    }
  };
  const handleVerify = async (code: string) => {
    const check = await serviceAPI.auth.validatePhone(data.representativePhoneNumber, code);
    if (check) {
      setVerify(true);
      dispatch(
        setInfoAlert({ open: true, title: 'Xác thực số điện thoại thành công', type: 'success' }),
      );
    } else {
      dispatch(
        setInfoAlert({ open: true, title: 'Xác thực số điện thoại thất bại', type: 'error' }),
      );
    }
  };
  return (
    <>
      <Grid
        container
        sx={{ padding: '0 60px 0' }}
      >
        {open && (
          <ConfirmCode
            open={open}
            handleClose={() => {
              setOpenDialog(false);
            }}
            handleSubmit={(code) => {
              handleVerify(code);
            }}
          />
        )}
        <Grid
          item
          xs={12}
        >
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Ngày thành lập:
          </Typography>
          <DateCalendar
            disableFuture
            value={data?.dateOfBirth ? new Date(data?.dateOfBirth) : new Date()}
            onChange={(e) => {
              setData({ ...data, dateOfBirth: e || new Date() });
            }}
          />
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Số điện thoại
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            value={data?.phoneNumber}
            fullWidth
            name='phoneNumber'
            variant='standard'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  {verify ? (
                    <TaskAltIcon color='success' />
                  ) : (
                    <IconButton
                      onClick={() => {
                        serviceAPI.auth.sendPhoneCode(data?.representativePhoneNumber);
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
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Địa chỉ
          </Typography>
          <TextField
            autoFocus
            value={data?.address}
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='address'
            variant='standard'
          />

          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Mạng xã hội nhóm:
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            value={data?.socialNetworkLink}
            onChange={handleChange}
            fullWidth
            name='socialNetworkLink'
            variant='standard'
            helperText={helperText}
          />

          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Tên nhóm:
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            value={data?.clubName}
            onChange={handleChange}
            fullWidth
            name='clubName'
            variant='standard'
          />
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='underOrg'
            value={data?.underOrg || '1'}
            onChange={handleChange}
          >
            <FormControlLabel
              value='1'
              control={<Radio />}
              label='Chủ nhiệm'
            />
            <FormControlLabel
              value='2'
              control={<Radio />}
              label='Sáng lập'
            />
          </RadioGroup>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='roleOnClub'
            value={data?.roleOnClub || '1'}
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
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Logo
          </Typography>
          <Avatar src={data?.logo} />
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Upload
              className='image-upload'
              setUrl={(url: string) => {
                setData({ ...data, logo: url });
              }}
              type='image/*'
              folder='avatar'
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default PersonalForm;

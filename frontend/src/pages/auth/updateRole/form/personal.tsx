import {
  Avatar,
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import Upload from '@services/firebase';
import { useState } from 'react';
interface PersonalFormProps {
  setData: (data: any) => void;
  data: any;
}

const PersonalForm = (props: PersonalFormProps) => {
  const { data, setData } = props;
  const [helperText, setHelperText] = useState<string>('');
  const checkLinkExistence = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });

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

  return (
    <>
      <Grid
        container
        sx={{ padding: '0 60px 0' }}
      >
        <Grid
          item
          xs={12}
        >
          <Typography>Ngày sinh:</Typography>
          <DateCalendar
            disableFuture
            value={data?.dateOfBirth ? new Date(data?.dateOfBirth) : new Date()}
            onChange={(e) => {
              setData({ ...data, dateOfBirth: e || new Date() });
            }}
          />
          <Typography>Số điện thoại</Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            value={data?.phoneNumber}
            fullWidth
            name='phoneNumber'
            variant='standard'
          />
          <Typography>Địa chỉ</Typography>
          <TextField
            autoFocus
            value={data?.address}
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='address'
            variant='standard'
          />

          <Typography>Mạng xã hội nhóm:</Typography>
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

          <Typography>Tên nhóm:</Typography>
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
          <Typography>Logo</Typography>
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

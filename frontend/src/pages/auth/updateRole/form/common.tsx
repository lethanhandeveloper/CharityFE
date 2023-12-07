import { FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { useState } from 'react';
interface CommonFormProps {
  setData: (data: any) => void;
  data: any;
}

const CommonForm = (props: CommonFormProps) => {
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
    if (event.target.name === 'actionDescSocialLink') {
      checkLinkExistence(event.target.value);
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
        <Grid
          item
          xs={12}
        >
          <Typography>Tên tổ chức</Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='name'
            variant='standard'
          />

          <Typography>Địa chỉ</Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='address'
            variant='standard'
          />

          <Typography>Mạng xã hội</Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='actionDescSocialLink'
            variant='standard'
            helperText={helperText}
          />

          <Typography>Email:</Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='representativeEmail'
            variant='standard'
          />
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='personal'
            value={data?.personal}
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

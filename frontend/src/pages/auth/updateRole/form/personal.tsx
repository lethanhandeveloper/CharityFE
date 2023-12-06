import { Box, Grid, TextField, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import Upload from '@services/firebase';
import { useState } from 'react';
interface OrginazationFormProps {
  setData: (data: any) => void;
  data: any;
}

const OrginazationForm = (props: OrginazationFormProps) => {
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
      console.error(`Error checking link existence: ${error?.message}`);
    }
  };
  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
    if (event.target.name === 'website') {
      checkLinkExistence(event.target.value);
    }
  };

  return (
    <>
      <Grid
        container
        sx={{ p: 4 }}
      >
        <Typography variant='subtitle2'>
          <Grid container>
            <Grid
              item
              xs={12}
            >
              <Typography>Tên nhóm</Typography>
              <TextField
                autoFocus
                margin='dense'
                onChange={handleChange}
                fullWidth
                name='name'
                variant='standard'
              />
              <Typography>Ngày sinh:</Typography>
              <DateCalendar
                disableFuture
                onChange={(e) => {
                  setData({ ...data, dateOfBirth: e || new Date() });
                }}
                defaultValue={new Date()}
              />
              <Typography>Số điện thoại</Typography>
              <TextField
                autoFocus
                margin='dense'
                onChange={handleChange}
                fullWidth
                name='phoneNumber'
                variant='standard'
                helperText={helperText}
              />
              <Typography>Địa chỉ</Typography>
              <TextField
                autoFocus
                margin='dense'
                onChange={handleChange}
                fullWidth
                name='address'
                variant='standard'
                helperText={helperText}
              />
              <Typography>Mạng xã hội nhóm:</Typography>
              <TextField
                autoFocus
                margin='dense'
                onChange={handleChange}
                fullWidth
                name='socialNetworkLink'
                variant='standard'
                helperText={helperText}
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
              <Typography>Tên nhóm:</Typography>
              <TextField
                autoFocus
                margin='dense'
                onChange={handleChange}
                fullWidth
                name='clubName'
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
                helperText={helperText}
              />
              <Typography>File xác thực</Typography>
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <object
                  data={data.achivementDoc}
                  style={{
                    width: '100%',
                    height: '30vh',
                  }}
                  type='application/pdf'
                />
                <Upload
                  className='pdf'
                  setUrl={(url: string) => {
                    setData({ ...data, achivementDoc: url });
                  }}
                  type='application/pdf'
                  folder='file'
                />
              </Box>
              <Typography>Logo</Typography>
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
        </Typography>
      </Grid>
    </>
  );
};
export default OrginazationForm;

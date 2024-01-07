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
import { DateCalendar } from '@mui/x-date-pickers';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import serviceAPI from '@services/api';
interface OrginazationFormProps {
  setData: (data: any) => void;
  data: any;
}

const OrginazationForm = (props: OrginazationFormProps) => {
  const { data, setData } = props;
  const [helperText, setHelperText] = useState<string>('');
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
    if (event.target.name === 'website') {
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
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Ngày thành lập
          </Typography>
          <DateCalendar
            disableFuture
            onChange={(e) => {
              setData({ ...data, establishedDate: e || new Date() });
            }}
            value={data?.establishedDate ? new Date(data?.establishedDate) : new Date()}
          />
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Website
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            value={data?.website}
            onChange={handleChange}
            fullWidth
            name='website'
            variant='standard'
            helperText={helperText}
          />
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Lĩnh vực hoạt động
          </Typography>
          <TextField
            autoFocus
            value={data?.operationField}
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='operationField'
            variant='standard'
          />

          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Người đại diện:
          </Typography>
          <TextField
            autoFocus
            value={data?.representativeName}
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='representativeName'
            variant='standard'
          />
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Số điện thoại:
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            value={data?.representativePhoneNumber}
            onChange={handleChange}
            fullWidth
            name='representativePhoneNumber'
            variant='standard'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => {
                      serviceAPI.auth.sendPhoneCode('0368485425');
                    }}
                  >
                    <CheckCircleOutlineIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='actionDescSocialLink'
            value={data?.actionDescSocialLink}
            onChange={handleChange}
          >
            <FormControlLabel
              value='1'
              control={<Radio />}
              label='Facebook'
            />
            <FormControlLabel
              value='2'
              control={<Radio />}
              label='Instagram'
            />
          </RadioGroup>
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Mô tả chi tiết
          </Typography>
          <Editor
            apiKey='km13aeu743orqcw7bikjee45mf4gymp1zxsnu73aoz6nwbfh'
            onEditorChange={(e) => {
              setData({ ...data, description: e });
            }}
            init={{
              plugins:
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
            initialValue='Welcome to TinyMCE!'
          />
        </Grid>
      </Grid>
    </>
  );
};
export default OrginazationForm;

import { FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';

import { Editor } from '@tinymce/tinymce-react';
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
          <Typography>Ngày thành lập</Typography>
          <DateCalendar
            disableFuture
            onChange={(e) => {
              setData({ ...data, establishedDate: e || new Date() });
            }}
            value={new Date(data?.establishedDate)}
          />
          <Typography>Website</Typography>
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
          <Typography>Lĩnh vực hoạt động</Typography>
          <TextField
            autoFocus
            value={data?.operationField}
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='operationField'
            variant='standard'
          />

          <Typography>Người đại diện:</Typography>
          <TextField
            autoFocus
            value={data?.representativeName}
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='representativeName'
            variant='standard'
          />
          <Typography>Số điện thoại:</Typography>
          <TextField
            autoFocus
            margin='dense'
            value={data?.representativePhoneNumber}
            onChange={handleChange}
            fullWidth
            name='representativePhoneNumber'
            variant='standard'
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
          <Typography>Mô tả chi tiết</Typography>
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

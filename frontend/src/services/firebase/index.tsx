import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from './config';
import { Box, IconButton, styled } from '@mui/material';
import { UploadTwoTone } from '@mui/icons-material';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Input = styled('input')({
  display: 'none',
});
const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`,
);
type typeUpload = 'image/*' | 'application/pdf';
type folderUpload = 'file' | 'avatar';
interface UploadProps {
  setUrl?: (url: string) => void;
  type?: typeUpload;
  folder?: folderUpload;
  className?: string;
}
const Upload = (props: UploadProps) => {
  const { setUrl, type, folder, className } = props;

  const [progress, setProgress] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const handleSubmit = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setShowProgress(true);
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(process);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (setUrl) setUrl(downloadURL);
          setShowProgress(false);
        });
      },
    );
  };
  return (
    <React.Fragment>
      {showProgress && <CircularProgressWithLabel value={progress} />}
      <ButtonUploadWrapper>
        <Input
          accept={type}
          id={className}
          name={className}
          type='file'
          onChange={handleSubmit}
        />
        <label htmlFor={className}>
          <IconButton
            component='span'
            color='primary'
          >
            <UploadTwoTone />
          </IconButton>
        </label>
      </ButtonUploadWrapper>
    </React.Fragment>
  );
};
export default Upload;

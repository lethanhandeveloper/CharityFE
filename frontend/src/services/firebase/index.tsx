import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from './config';
import { Box, IconButton, styled } from '@mui/material';
import { UploadTwoTone } from '@mui/icons-material';

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
interface UploadProps {
  setUrl?: (url: string) => void;
}
const Upload = (props: UploadProps) => {
  const { setUrl } = props;
  const [progress, setProgress] = useState<number>(0);
  const handleSubmit = (e: any) => {
    const file = e.target.files[0];
    console.log(file, 'file');
    if (!file) return;
    const storageRef = ref(storage, `avatar/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(process);
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL, 'link dơnload');
          if (setUrl) setUrl(downloadURL);
        });
      },
    );
  };
  return (
    <React.Fragment>
      <ButtonUploadWrapper>
        <Input
          accept='image/*'
          id='icon-button-file'
          name='icon-button-file'
          type='file'
          onChange={handleSubmit}
        />
        <label htmlFor='icon-button-file'>
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

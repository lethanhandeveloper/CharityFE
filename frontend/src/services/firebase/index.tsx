import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from './config';
import { Button } from '@mui/material';

interface UploadProps {
  setUrl: (url: string) => void;
}
const Upload = (props: UploadProps) => {
  const { setUrl } = props;
  const [progress, setProgress] = useState<number>(0);
  const handleSubmit = (e: any) => {
    const file = e.target[0].files[0];
    if (!file) return;
    const storageRef = ref(storage, `file/${file.name}`);
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
          setUrl(downloadURL);
        });
      },
    );
  };
  return (
    <React.Fragment>
      <Button onClick={handleSubmit}>Tải file</Button>
    </React.Fragment>
  );
};
export default Upload;

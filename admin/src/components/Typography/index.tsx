import { Typography } from '@mui/material';
import React from 'react';

const TypographyLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant='subtitle2'
      gutterBottom
      fontSize={'14px'}
      fontWeight={'600'}
      color={'black'}
    >
      {children}
    </Typography>
  );
};
export default TypographyLabel;

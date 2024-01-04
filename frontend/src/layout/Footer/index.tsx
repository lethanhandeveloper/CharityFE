import { Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <React.Fragment>
      <div
        style={{
          textAlign: 'center',
          background: '#fbe8de',
          padding: '20px',
        }}
      >
        <Typography>
          Giải pháp thuộc Đề án Hệ tri thức Việt số hoá (iTrithuc), cấu phần Nền tảng nhân đạo số
          quốc gia
        </Typography>

        <Typography>Powered by VTV</Typography>
      </div>
    </React.Fragment>
  );
};
export default Footer;

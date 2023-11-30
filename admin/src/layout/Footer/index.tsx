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
          quốc gia do MBBank xây dựng và vận hành theo Quyết định số 3068/QĐ-BKHCN
        </Typography>

        <Typography>Powered by VTV</Typography>
      </div>
    </React.Fragment>
  );
};
export default Footer;

import TypographyTitle from '@common/Typography';
import { Grid, Typography } from '@mui/material';
import React from 'react';

const NewsSection = () => {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        sx={{
          padding: '0 20px 40px 20px',
          backgroundSize: 'cover',
          height: '300px',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://media.vneconomy.vn/w800/images/upload/2023/02/22/blockchain.jpg)',
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
      >
        <Grid
          item
          textAlign={'center'}
          xs={12}
        >
          <TypographyTitle color={'white'}>Giới thiệu</TypographyTitle>
        </Grid>

        <Typography
          sx={{
            marginLeft: 30,
            marginRight: 30,
            textAlign: 'center',
            color: 'white',
          }}
        >
          Chào mừng bạn đến với trang web của chúng tôi - nơi kết hợp công nghệ tiên tiến và đổi mới
          để mang đến trải nghiệm độc đáo và an toàn. Chúng tôi tự hào thông báo rằng trang web của
          chúng tôi sử dụng công nghệ blockchain để tối ưu hóa quy trình và đảm bảo tính minh bạch
          và an toàn cho tất cả người dùng.
        </Typography>
      </Grid>
    </React.Fragment>
  );
};
export default NewsSection;

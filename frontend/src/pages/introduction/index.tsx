import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import TypographyTitle from '@common/Typography';
const IntroductionPage = () => {
  return (
    <React.Fragment>
      <Grid
        container
        justifyContent={'center'}
        textAlign={'center'}
        sx={{
          backgroundImage:
            'url(https://thiennguyen.app/_next/static/media/bg_different.241f6c61.png)',
        }}
      >
        <TypographyTitle style={{ marginTop: '10px' }}>Giới thiệu chung</TypographyTitle>

        <Typography style={{ marginLeft: '30px', marginRight: '30px' }}>
          Giải pháp công nghệ tích hợp bao gồm App Thiện Nguyện và tài khoản thiện nguyện minh bạch
          4 số, dành tặng các tổ chức, cá nhân vận động gây quỹ vì cộng đồng. Giải pháp là cấu phần
          thuộc Đề án Hệ tri thức Việt số hoá (iTrithuc)
        </Typography>
        <Grid
          item
          xs={4}
        >
          <img
            src='https://thiennguyen.app/_next/static/media/vision2.ba8e658c.png'
            style={{ height: '70px', width: '70px' }}
          />
          <Typography fontWeight={'bold'}>Tầm nhìn</Typography>
          <Typography>
            Đến năm 2025 trở thành mạng xã hội thiện nguyện đầu tiên tại Việt Nam dành cho cộng đồng
            thiện nguyện minh bạch
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <img
            src='https://thiennguyen.app/_next/static/media/exclusively.4336a05a.png'
            style={{ height: '70px', width: '70px' }}
          />
          <Typography fontWeight={'bold'}>Sứ mệnh</Typography>
          <Typography>
            Ứng dụng công nghệ vào hoạt động nhân đạo, thiện nguyện, cộng đồng, thúc đẩy tính minh
            bạch
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <img
            src='https://thiennguyen.app/_next/static/media/connect.e5d1e19a.png'
            style={{ height: '70px', width: '70px' }}
          />
          <Typography fontWeight={'bold'}>Giá trị cốt lõi</Typography>
          <Typography>Minh bạch, sẻ chia, kết nối, thuận tiện</Typography>
        </Grid>

        <Grid
          item
          xs={12}
        >
          <TypographyTitle style={{ marginTop: '10px' }}>
            Giải pháp thúc đẩy tính minh bạch
          </TypographyTitle>
          <Grid
            container
            justifyContent={'start'}
            textAlign={'left'}
            padding={'20px'}
            rowSpacing={5}
            columnSpacing={5}
          >
            <Grid
              item
              xs={6}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <img
                  style={{ height: 50, width: 50 }}
                  src='https://thiennguyen.app/_next/static/media/minhbach.1abe9549.png'
                />
                <div>
                  <Typography
                    fontWeight={'bold'}
                    display={'inline'}
                  >
                    Minh bạch công khai 24/7
                  </Typography>
                  <Typography>
                    Tự động báo cáo, thống kê, chia sẻ và xuất báo cáo sao kê theo yêu cầu
                  </Typography>
                </div>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <img
                  src='https://thiennguyen.app/_next/static/media/taikhoan4so.053b1dfd.png'
                  style={{ height: 50, width: 50 }}
                />
                <div>
                  <Typography fontWeight={'bold'}>Sở hữu miễn phí tài khoản 4 số</Typography>
                  <Typography>
                    Tài khoản thanh toán ngân hàng đầu tiên tại Việt Nam chỉ có 4 số, tự động minh
                    bạch sao kê, dành riêng cho mục đích thiện nguyện
                  </Typography>
                </div>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  marginLeft: '40px',
                }}
              >
                <img
                  src='https://thiennguyen.app/_next/static/media/dedang.a62cdfbc.png'
                  style={{ height: 50, width: 50 }}
                />
                <div>
                  <Typography fontWeight={'bold'}>Dễ dàng tạo mục tiêu gây quỹ</Typography>
                  <Typography>
                    Thiết kế, quản lý mục tiêu gây quỹ và đăng tải, cập nhật các hoạt động thiện
                    nguyện bằng các thao tác đơn giản
                  </Typography>
                </div>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <img src='https://thiennguyen.app/_next/static/media/ketnoi.81eff1c9.png' />
                <div>
                  <Typography fontWeight={'bold'}>Mở rộng kết nối</Typography>
                  <Typography>
                    Lan tỏa mục tiêu gây quỹ đến với cộng đồng hơn 20 triệu khách hàng trên hệ sinh
                    thái
                  </Typography>
                </div>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            padding={'30px'}
          >
            <img
              src='https://thiennguyen.app/_next/static/steps-852d4fd741dbeb0e7153a72cfd5de790.svg'
              style={{ height: '100%', width: '100%', borderRadius: '20px' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default IntroductionPage;

import TypographyTitle from '@common/Typography';
import { Grid, Typography } from '@mui/material';

const BannerSection = ({ data }: { data: any }) => {
  return (
    <Grid
      item
      xs={12}
      style={{
        height: '350px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'linear-gradient(281deg,rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(https://media.vneconomy.vn/w800/images/upload/2023/02/22/blockchain.jpg)',
      }}
    >
      <Grid
        container
        textAlign='center'
        padding='20px'
      >
        <Grid
          item
          xs={12}
        >
          <TypographyTitle
            color='#fff'
            fontSize='24px'
            marginTop='10px'
          >
            Đồng hành dễ dàng hơn cùng
          </TypographyTitle>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'white',
            }}
          >
            Chào mừng bạn đến với trang web của chúng tôi - nơi kết hợp công nghệ tiên tiến và đổi
            mới để mang đến trải nghiệm độc đáo và an toàn. Chúng tôi tự hào thông báo rằng trang
            web của chúng tôi sử dụng công nghệ blockchain để tối ưu hóa quy trình và đảm bảo tính
            minh bạch và an toàn cho tất cả người dùng.
          </Typography>
          <Typography
            color='#fff'
            fontSize='28px'
            marginBottom='30px'
          ></Typography>

          <Grid
            container
            rowSpacing={'10'}
            columnSpacing={'10'}
          >
            <Grid
              item
              xs={4}
            >
              <Typography
                fontWeight='bold'
                fontSize={'40px'}
                color={'#fff'}
              >
                {data?.organizationCount}
              </Typography>
              <Typography color={'#fff'}>Tổ chức thiện nguyện</Typography>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Typography
                fontWeight='bold'
                fontSize={'40px'}
                color={'#fff'}
              >
                {data?.userCount}
              </Typography>
              <Typography color={'#fff'}>Cá nhân thiện nguyện</Typography>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Typography
                fontWeight='bold'
                fontSize={'40px'}
                color={'#fff'}
              >
                {data?.campaignCount}
              </Typography>
              <Typography color={'#fff'}>Thành viên tham gia</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default BannerSection;

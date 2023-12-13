import { Grid, Typography } from '@mui/material';

const BannerSection = ({ data }: { data: any }) => {
  return (
    <Grid
      item
      xs={12}
      style={{ background: 'linear-gradient(281deg,#f54a00,#ff9252 102.8%)' }}
    >
      <Grid
        container
        textAlign='left'
        padding='20px'
      >
        <Grid
          item
          xs={4}
        >
          <img src='https://thiennguyen.app/_next/static/phone-infor-86ba5e6613144aa680d166a4de5addbe.svg' />
        </Grid>
        <Grid
          item
          xs={8}
        >
          <Typography
            color='#fff'
            fontSize='24px'
            marginTop='30px'
          >
            Đồng hành dễ dàng hơn cùng
          </Typography>
          <Typography
            color='#fff'
            fontSize='28px'
            marginBottom='30px'
          ></Typography>

          <img
            src='https://thiennguyen.app/_next/static/media/download_ios.be3c8ac5.png'
            style={{ height: '40px', width: '150px', marginRight: '10px' }}
          />
          <img
            src='https://thiennguyen.app/_next/static/media/download_android.d8811978.png'
            style={{ height: '40px', width: '150px' }}
          />

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

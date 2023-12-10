import TypographyTitle from '@common/Typography';
import CardSlice from '@components/Card';
import AliceCarousel from 'react-alice-carousel';
import { Box, Grid, Typography } from '@mui/material';

import { LinkCustom } from '@common/Link';
import { CampainUI } from '@models/campain';
import { SimpleValueKey } from '@models/meta';

const handleDragStart = (e: { preventDefault: () => any }) => e.preventDefault();
interface FeatureSectionProps {
  list: CampainUI[];
  categorys: SimpleValueKey[];
}
const FeatureSection = (props: FeatureSectionProps) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{ padding: '0 20px 0 20px' }}
    >
      <Grid
        item
        xs={12}
        textAlign={'center'}
      >
        <TypographyTitle>Quỹ chiến dịch nổi bật</TypographyTitle>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '30px',
            border: '1px solid red',
            width: '40%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <img
              src='https://thiennguyen.app/resources/default-avatar/avatar-1.png'
              style={{ borderRadius: '50%', width: '40px', height: '40px' }}
            />
            <Typography fontWeight='bold'>Người ủng hộ ẩn danh</Typography>
            <Typography>vừa mới ủng hộ</Typography>
            <Typography
              color='#f54a00'
              fontWeight='bold'
            >
              {(5000).toLocaleString()}
            </Typography>
          </div>

          <Typography
            color='#858585'
            fontSize='13px'
            marginRight='15px'
          >
            17 phút trước
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        display='flex'
        flexDirection='row'
        gap={5}
        justifyContent='center'
        marginTop='30px'
      >
        {props.categorys?.map((item) => (
          <p
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '5px',
              paddingLeft: '15px',
              paddingRight: '15px',
              boxShadow: '0px 1px 16px 0px rgba(56, 56, 56, 0.15)',
            }}
          >
            {item.value}
          </p>
        ))}
      </Grid>

      <Grid
        item
        xs={12}
      >
        <AliceCarousel
          responsive={{
            0: { items: 1 },
            568: { items: 2 },
            1024: { items: 3 },
          }}
          mouseTracking
          items={props.list.map((item) => (
            <CardSlice
              handleDragStart={handleDragStart}
              data={item}
            />
          ))}
          disableButtonsControls={true}
          autoPlay={true}
          disableDotsControls={true}
          animationDuration={6000}
        />
      </Grid>
      <Grid
        item
        xs={12}
        justifyContent={'center'}
        display={'flex'}
        flexDirection={'row'}
        marginBottom={'20px'}
      >
        <LinkCustom to={'/campaign'}>Xem thêm</LinkCustom>
      </Grid>
    </Grid>
  );
};
export default FeatureSection;

import TypographyTitle from '@common/Typography';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

interface NewsCardProps {
  newsList: any;
}
const NewsSection = (props: NewsCardProps) => {
  const renderCard = (card: any) => {
    return (
      <Card
        sx={{
          borderRadius: '10px',
          width: '100%',
          textAlign: 'left',
          height: '100%',
          position: 'relative',
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={card.imageUrl}
          title='green iguana'
        />
        <CardContent style={{ marginBottom: '30px' }}>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            fontSize='18px'
          >
            {card.title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
          >
            {card.description}
          </Typography>
        </CardContent>
        <CardActions style={{ position: 'absolute', left: '0', bottom: '15px' }}>
          <a style={{ color: '#f54a00' }}>Xem chi tiết &gt;</a>
        </CardActions>
      </Card>
    );
  };
  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        sx={{
          padding: '0 20px 40px 20px',
          backgroundImage:
            'linear-gradient(0deg,#fff 5%,#f3f6fe 17%,#ecf0fd 51%,#f2f5fd 83%,#fdfdfe 95%)',
        }}
      >
        <Grid
          item
          textAlign={'center'}
          xs={12}
        >
          <TypographyTitle>Tin tức, sự kiện</TypographyTitle>
        </Grid>

        {props.newsList.map((item: any) => (
          <Grid
            item
            xs={4}
          >
            {renderCard(item)}
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default NewsSection;

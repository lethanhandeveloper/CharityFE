import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import Card from '@mui/material/Card/Card';
import ProgressCustom from '@common/Progess';
import React, { FC } from 'react';
interface ICardSlide {
  handleDragStart: (e: { preventDefault: () => any }) => void;
  data: any;
}
const CardSlice: FC<ICardSlide> = (props) => {
  const { handleDragStart, data } = props;
  return (
    <React.Fragment>
      <Card
        variant='outlined'
        onDragStart={handleDragStart}
        sx={{
          margin: '10px 10px 20px',
          boxShadow: '0 8px 24px hsla(210,8%,62%,.2)',
          borderRadius: '10px',
        }}
      >
        <CardMedia
          sx={{ height: 200 }}
          image={data.imageUrl}
        />
        <CardContent>
          <Typography
            sx={{
              background: '#f4f4f4',
              padding: '3px 15px',
              position: 'absolute',
              borderRadius: '12px',
              top: '10px',
              margin: '5px 0 0 5px',
            }}
            fontSize={'13px'}
          >
            Còn {data.countDay} ngày
          </Typography>

          <Typography
            sx={{
              fontSize: '20px',
              lineHeight: '22px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              textAlign: 'start',
              fontWeight: 'bold',
            }}
          >
            {data.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography
              fontSize={16}
              variant='body2'
              color='text.secondary'
            >
              Tạo bởi
            </Typography>
            <Typography
              fontSize={14}
              color='#f54a00'
              fontWeight='bold'
            >
              {data.createdBy}
            </Typography>
          </Box>

          <ProgressCustom
            variant='determinate'
            value={data.percent}
            sx={{ height: '10px', borderRadius: '10px' }}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant='body2'
              color='text.secondary'
            >
              Đã đạt được
            </Typography>
            <Typography
              fontSize={14}
              color='#f54a00'
              fontWeight='bold'
            >
              {data.count} VNĐ
            </Typography>
            <Typography>{data.percent}%</Typography>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
export default CardSlice;

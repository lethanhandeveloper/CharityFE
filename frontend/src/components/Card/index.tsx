import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import Card from '@mui/material/Card/Card';
import ProgressCustom from '@common/Progess';
import React, { FC, useEffect } from 'react';
import { CampainUI } from '@models/campain';
import { Link } from 'react-router-dom';
import campaign from '@services/ethers/campaign';
import { mapCampainContract } from '@mapdata/contract';
import { CampaignContractUI } from '@models/contract';
interface ICardSlide {
  handleDragStart: (e: { preventDefault: () => any }) => void;
  data: CampainUI;
}
const CardSlice: FC<ICardSlide> = (props) => {
  const { handleDragStart, data } = props;
  const [contract, setContract] = React.useState<CampaignContractUI>();
  const handleGetDay = (endDate: Date): number => {
    return Math.floor((endDate.getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24);
  };
  useEffect(() => {
    const initData = async () => {
      const contract = await campaign.getCampainDetail(data.id);
      if (contract) {
        setContract(mapCampainContract(contract));
      }
    };
    initData();
  }, [data.id]);
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
          image={data.thumbnail}
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
            {handleGetDay(data.endDate) > 0 ? (
              <>Còn {handleGetDay(data.endDate).toFixed(0)} ngày</>
            ) : (
              <>Đã kết thúc</>
            )}
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
            <Link
              to={`/campaign/donate/${data.id}`}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              {data.title}
            </Link>
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
              {data.creatorId}
            </Typography>
          </Box>

          <ProgressCustom
            variant='determinate'
            value={0}
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
              {contract?.donateValue}
            </Typography>
            <Typography>{0}%</Typography>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
export default CardSlice;

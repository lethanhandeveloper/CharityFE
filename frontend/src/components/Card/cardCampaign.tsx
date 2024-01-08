import ProgressCustom from '@common/Progess';
import { mapCampainContract } from '@mapdata/contract';
import { CampainUI } from '@models/campain';
import { CampaignContractUI } from '@models/contract';
import ExtendedWindow from '@models/ether';
import { Box, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FormConfirm from '@pages/consultant/dialog';
import serviceAPI from '@services/api';
import campaign from '@services/ethers/campaign';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const calculatePercent = (current: number, target: number): number => {
  return Number(((current / target) * 100).toFixed(2));
};
const calculateDayCountDown = (endDate: Date): number => {
  return Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / 1000 / 60 / 24);
};
const CardCampaign = ({
  data,
  isOwner,
  isHover,
}: {
  isOwner: boolean;
  data: CampainUI;
  isHover?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [dataWithDraw, setData] = useState<any>();
  const [contract, setContract] = useState<CampaignContractUI>();
  const withDraw = async (id: string) => {
    try {
      const fileId = await serviceAPI.file.createFile(dataWithDraw.file);

      await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const check = await campaign.addRequest(
        id,
        dataWithDraw.number,
        address,
        localStorage.getItem('userId') || 'anonymous',
        dataWithDraw.message,
        fileId?._id,
      );
      if (check) {
        dispatch(
          setInfoAlert({ open: true, title: 'Yêu cầu rút tiền đã được gửi', type: 'success' }),
        );
      } else {
        dispatch(setInfoAlert({ open: true, title: 'Không thể yêu cầu bây giờ', type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ open: true, title: 'Không thể kết nối bây giờ', type: 'error' }));
    }
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
    <Card
      variant='outlined'
      sx={
        !isHover
          ? {
              margin: '10px 10px 20px',
              boxShadow: '0 8px 24px hsla(210,8%,62%,.2)',
              borderRadius: '10px',
            }
          : {
              margin: '10px 10px 20px',
              boxShadow: '0 8px 24px hsla(210,8%,62%,.2)',
              borderRadius: '10px',
              ':hover': {
                boxShadow: '0 8px 24px hsla(210,8%,62%,.6)',
                marginTop: 0,
              },
            }
      }
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
          {calculateDayCountDown(data.endDate) > 0 ? (
            <>Còn {calculateDayCountDown(data.endDate).toFixed(0)} ngày</>
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

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginTop: '10px' }}>
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
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            marginTop: '30px',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography
              fontSize={16}
              color='#f54a00'
              fontWeight='bold'
            >
              {contract?.donateValue?.toLocaleString()}
            </Typography>
            <Typography
              variant='body2'
              fontSize={16}
              color='text.secondary'
            >
              đã đạt được
            </Typography>
          </Box>

          <Typography fontSize={16}>
            {calculatePercent(contract?.donateValue || 0, data.targetValue)}%
          </Typography>
        </Box>
        <ProgressCustom
          variant='determinate'
          value={calculatePercent(contract?.donateValue || 0, data.targetValue)}
          sx={{ height: '10px', borderRadius: '10px', marginTop: '10px' }}
        />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            marginTop: '10px',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant='body2'
            color='text.secondary'
            fontSize={16}
          >
            của mục tiêu {data.targetValue.toLocaleString()} VNĐ
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {isOwner && (
          <FormConfirm
            buttonText='Rút tiền'
            data={dataWithDraw}
            message='Xác nhận yêu cầu rút tiền. Điền đầy đủ các thông tin theo hướng dẫn'
            onSave={() => {
              withDraw(data.id);
            }}
            setData={setData}
            title='Yêu cầu rút tiền'
          />
        )}
      </CardActions>
    </Card>
  );
};
export default CardCampaign;

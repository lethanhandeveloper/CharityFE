import { Button } from '@mui/material';
import { styled } from '@mui/styles';

export const ButtonStyle1 = styled(Button)({
  backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: '30px !important',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white !important',
  height: 48,
  padding: '0 30px',
});

export const ButtonStyle2 = styled(Button)({
  backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: '30px !important',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white !important',
  height: 48,
  padding: '0 30px',
});

export const ButtonCancel = styled(Button)({
  color: '#f54a00 !important',
  borderRadius: '20px !important',
  border: '1px solid #f54a00 !important',
  padding: '5px 25px 5px 25px !important',
});

export const ButtonConfirm = styled(Button)({
  color: 'white !important',
  padding: '5px 25px 5px 25px !important',
  borderRadius: '20px !important',
  border: '1px solid #f54a00 !important',
  background: '#f54a00 !important',
});

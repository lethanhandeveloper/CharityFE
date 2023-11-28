import { Link } from 'react-router-dom';
import { styled } from '@mui/styles';

export const LinkCustom = styled(Link)({
  textDecoration: 'none',
  backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  textAlign: 'center',
  paddingTop: '12px',
  borderRadius: '30px !important',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white !important',
  height: 48,
  padding: '0 30px',
});

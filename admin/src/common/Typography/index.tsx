import { Typography } from '@mui/material';
import { styled } from '@mui/styles';

const TypographyTitle = styled(Typography)({
  fontSize: '20px !important',
  fontWeight: '600 !imporant',
  marginTop: '10px !important',
  marginBottom: '10px !important',
  position: 'relative',
  display: 'inline-block',

  '&::after,&::before': {
    content: '""',
    display: 'block',
    background: '#f54a00',
    width: '64px',
    height: '2px',
    position: 'absolute',
    top: '50%',
  },

  '&::after': {
    right: '-104px',
  },

  '&::before': {
    left: '-100px',
  },
});
export default TypographyTitle;

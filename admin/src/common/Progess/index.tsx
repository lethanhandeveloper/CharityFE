import { LinearProgress, linearProgressClasses } from '@mui/material';
import { styled } from '@mui/styles';

const ProgressCustom = styled(LinearProgress)({
  height: 10,
  borderRadius: 5,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#e9ecef',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
});
export default ProgressCustom;

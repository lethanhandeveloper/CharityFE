import { Box, CircularProgress } from '@mui/material';

const SuspenseLoader = () => {
  return (
    <Box
      sx={{
        position: 'flex',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress
        size={64}
        disableShrink
        thickness={3}
      />
    </Box>
  );
};
export default SuspenseLoader;

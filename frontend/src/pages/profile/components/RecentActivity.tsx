import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
} from '@mui/material';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`,
);

function RecentActivity() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title='Ủng hộ gần đây' />
      <Divider />
      <Box
        px={2}
        py={4}
        display='flex'
        alignItems='flex-start'
      >
        <AvatarPrimary>
          <ShoppingBagTwoToneIcon />
        </AvatarPrimary>
        <Box
          pl={2}
          flex={1}
        >
          <Typography variant='h3'>Orders</Typography>

          <Box
            pt={2}
            display='flex'
          >
            <Box pr={8}>
              <Typography
                gutterBottom
                variant='caption'
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant='h2'>485</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant='caption'
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Failed
              </Typography>
              <Typography variant='h2'>8</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Card>
  );
}

export default RecentActivity;
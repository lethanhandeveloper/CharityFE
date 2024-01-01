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

import TableRender from '@components/Table';
import React from 'react';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`,
);

function RecentActivity({ id }: { id: string }) {
  const theme = useTheme();
  const [data, setCount] = React.useState<{ total: number; value: number }>({ total: 0, value: 0 });
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
          <Box
            pt={2}
            display='flex'
          >
            <Box pr={8}>
              <Typography
                gutterBottom
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Tổng tiền quyên góp
              </Typography>
              <Typography variant='h2'>{data.value}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Số lần quyên góp
              </Typography>
              <Typography variant='h2'>{data.total}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <TableRender
        setCount={(a, b) => {
          setCount({ total: a, value: b });
        }}
        id={id}
        isCampaign={false}
      />
    </Card>
  );
}

export default RecentActivity;

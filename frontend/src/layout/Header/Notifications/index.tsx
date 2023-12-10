import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';

import { formatDistance, subDays } from 'date-fns';
import campaign from '@services/ethers/campaign';
import { mapHistoryContracts } from '@mapdata/contract';
import { HistoryContractUI } from '@models/contract';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
      
      .MuiBadge-badge {
          background-color: ${alpha(theme.palette.error.main, 0.1)};
          color: ${theme.palette.error.main};
          min-width: 16px; 
          height: 16px;
          padding: 0;
  
          &::after {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
              content: "";
          }
      }
  `,
);

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [list, setList] = useState<HistoryContractUI[]>([]);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  useEffect(() => {
    const initData = async () => {
      const id = localStorage.getItem('userId');

      const history = await campaign.getHistoryByUser(id || '');
      setList(mapHistoryContracts(history));
    };
    initData();
  }, []);
  return (
    <>
      <Tooltip
        arrow
        title='Lịch sử'
      >
        <IconButton
          color='primary'
          ref={ref}
          onClick={handleOpen}
        >
          <NotificationsBadge
            badgeContent={1}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{ p: 2 }}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='h5'>Lịch sử</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {list?.map((item) => (
            <ListItem sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}>
              <Box flex='1'>
                <Box
                  display='flex'
                  justifyContent='space-between'
                >
                  <Typography sx={{ fontWeight: 'bold' }}>{item.value}</Typography>
                  <Typography
                    variant='caption'
                    sx={{ textTransform: 'none' }}
                  >
                    {formatDistance(subDays(new Date(), 3), new Date(), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Box>
                <Typography
                  component='span'
                  variant='body2'
                  color='text.secondary'
                >
                  {item.time.toString()}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default HeaderNotifications;

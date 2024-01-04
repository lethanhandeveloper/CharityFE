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
import { WithDrawUI } from '@models/contract';
import { mapWithDaws } from '@services/mapdata/requestDraw';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';

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
  const [list, setList] = useState<WithDrawUI[]>([]);
  const dispatch = useAppDispatch();
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  useEffect(() => {
    const initData = async () => {
      try {
        const response = await campaign.getRequestForAdmin();
        setList(mapWithDaws(response));
      } catch (e) {
        dispatch(setInfoAlert({ open: true, title: 'Hệ thống đang khởi chạy', type: 'info' }));
      }
    };
    initData();
  }, []);

  return (
    <>
      <Tooltip
        arrow
        title='Notifications'
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
          <Typography variant='h5'>Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {list.map((item) => (
            <ListItem
              key={item.id}
              sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}
            >
              <Box flex='1'>
                <Box
                  display='flex'
                  justifyContent='space-between'
                >
                  <Typography sx={{ fontWeight: 'bold' }}>{item.message}</Typography>
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
                  {item.time}
                  <br />
                  {item.status}
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

import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Divider, Hidden, lighten, Popover, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import serviceAPI from '@services/api';
import { mapUserUI } from '@services/mapdata/user';
import { UserUI } from '@models/user';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`,
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`,
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`,
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`,
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`,
);

function HeaderUserbox() {
  const [user, setUser] = useState<UserUI>();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const navigation = useNavigate();
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
        const data = await serviceAPI.auth.getProfile();
        setUser(mapUserUI(data.data.result));
      } catch (err) {
        dispatch(
          setInfoAlert({ open: true, title: 'Không có quyền truy cập hệ thống!', type: 'error' }),
        );
      }
    };
    initData();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('tokenAdmin');
    navigation('/login');
  };
  return (
    <>
      <UserBoxButton
        color='secondary'
        ref={ref}
        onClick={handleOpen}
      >
        <Avatar
          variant='rounded'
          alt={user?.fullname}
          src={user?.imageUrl}
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant='body1'>{user?.fullname}</UserBoxLabel>
            <UserBoxDescription variant='body2'>{user?.age}</UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
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
        <MenuUserBox
          sx={{ minWidth: 210 }}
          display='flex'
        >
          <Avatar
            variant='rounded'
            alt={user?.fullname}
            src={user?.imageUrl}
          />
          <UserBoxText>
            <UserBoxLabel variant='body1'>{user?.fullname}</UserBoxLabel>
            <UserBoxDescription variant='body2'>{user?.age}</UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />

        <Divider />
        <Box sx={{ m: 1 }}>
          <Button
            color='primary'
            fullWidth
            onClick={handleLogOut}
          >
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Đăng xuất
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;

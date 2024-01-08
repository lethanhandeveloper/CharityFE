import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Divider, Hidden, Popover, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import serviceAPI from '@services/api';
import { mapUserUI } from '@services/mapdata/user';
import { UserUI } from '@models/user';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import campaign from '@services/ethers/campaign';
import ExtendedWindow from '@models/ether';
import { ethers } from 'ethers';
import ConfirmCode from './dialog';

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

function HeaderUserbox() {
  const [user, setUser] = useState<UserUI>();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(true);
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

  const handleSetAdminAddress = async () => {
    try {
      await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      campaign.setAddress(address);
    } catch (err) {
      dispatch(setInfoAlert({ open: true, title: 'Đăng nhập ví để thực hiện', type: 'error' }));
    }
  };
  return (
    <>
      <UserBoxButton
        color='secondary'
        ref={ref}
        onClick={handleOpen}
      >
        {openDialog && (
          <ConfirmCode
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            handleSubmit={handleSetAdminAddress}
          />
        )}

        <Avatar
          variant='rounded'
          alt={user?.fullname}
          src={user?.imageUrl}
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant='body1'>{user?.fullname}</UserBoxLabel>
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
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />

        <Divider />
        <Box sx={{ m: 1 }}>
          <Button
            color='primary'
            fullWidth
            onClick={() => {
              // campaign.setAddress('0x5Ab3AaFbEEdc60316a3C667787a6C52d6BfAC3d7');
              campaign.setHistoryAddress();
            }}
          >
            Thiết lập địa chỉ contract
          </Button>
          <Button
            color='primary'
            fullWidth
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Thiết lập địa chỉ admin
          </Button>
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

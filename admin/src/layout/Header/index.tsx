import { Box, alpha, Stack, lighten, Divider, styled, useTheme } from '@mui/material';

import HeaderUserbox from './User';
import HeaderMenu from './Menu';
import HeaderSearch from './SearchBox';
import HeaderNotifications from './Notifications';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background ?? '', 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
     
`,
);

function Header() {
  const theme = useTheme();
  const token = localStorage.getItem('token');
  return (
    <HeaderWrapper
      display='flex'
      alignItems='center'
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15,
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2,
              )}, 0px 5px 22px -4px ${alpha(theme.colors.alpha.black[100], 0.1)}`,
      }}
    >
      <Stack>
        <img
          src='https://thiennguyen.app/_next/static/media/logo@2x.82fbd1ac.png'
          width='160px'
          height='44px'
        />
      </Stack>
      <Stack
        direction='row'
        divider={
          <Divider
            orientation='vertical'
            flexItem
          />
        }
        alignItems='center'
        spacing={2}
      >
        <HeaderMenu />
      </Stack>
      <Box
        display='flex'
        alignItems='center'
      >
        <Box sx={{ mr: 1 }}>
          <HeaderSearch />
          {!!token && (
            <Box
              sx={{ mx: 0.5 }}
              component='span'
            >
              <HeaderNotifications />
            </Box>
          )}
        </Box>
        {!token ? (
          <Link
            to={'/login'}
            style={{
              textDecoration: 'none',
              color: 'white',
              backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              padding: 10,
              borderRadius: 30,
            }}
          >
            Đăng nhập
          </Link>
        ) : (
          <HeaderUserbox />
        )}

        <Box
          component='span'
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' },
          }}
        ></Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;

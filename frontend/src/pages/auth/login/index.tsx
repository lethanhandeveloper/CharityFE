import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { Divider, Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';

import { ButtonStyle2 } from '@common/Button';
import { BoxColum } from '@common/Box';
import { TextFieldStyle1 } from '@common/TextField';

import style from '../auth.module.scss';
import serviceAPI from '@services/api/index';
import { UserAPI } from 'models/user';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUserInfo] = useState<UserAPI>({ useraccount: '', password: '' });
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigation = useNavigate();
  const [messageError, setMessageError] = useState<string>('');
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const onSubmit = async () => {
    try {
      const loginInfo = await serviceAPI.auth.login(user);
      if (loginInfo.status === 200) {
        if (loginInfo.data.result.role === 4) {
          dispatch(
            setInfoAlert({ open: true, title: 'Sai mật khẩu hoặc tên đăng nhập', type: 'error' }),
          );
        } else {
          localStorage.setItem('token', loginInfo.data.result.token);
          localStorage.setItem('role', loginInfo.data.result.role);
          localStorage.setItem('userId', loginInfo.data.result._id);
          navigation('/home');
        }
      } else {
        dispatch(
          setInfoAlert({ open: true, title: 'Sai mật khẩu hoặc tên đăng nhập', type: 'error' }),
        );
      }
    } catch (error) {
      dispatch(
        setInfoAlert({ open: true, title: 'Sai mật khẩu hoặc tên đăng nhập', type: 'error' }),
      );
    }
  };

  const handleOnChange = (e: any) => {
    setMessageError('');
    setUserInfo({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      {token && <Navigate to={'/home'} />}
      <Grid container>
        <Grid
          item
          xs={6}
        >
          <div className={style['backgound-login']} />
        </Grid>
        <Grid
          item
          xs={1}
        ></Grid>
        <Grid
          item
          xs={4}
        >
          <BoxColum>
            <Typography
              fontSize={'24px'}
              fontWeight={600}
              lineHeight={'34px'}
              textAlign='left'
              className={style['mt-40']}
            >
              Đăng nhập
            </Typography>

            <BoxColum>
              <Typography
                textAlign='left'
                className={style['mt-40']}
              >
                Email
              </Typography>
              <TextFieldStyle1
                required
                size='small'
                type='email'
                name='useraccount'
                value={user.useraccount}
                onChange={handleOnChange}
                variant='outlined'
                className={style['mt-20']}
                placeholder='Email'
              />

              <Typography
                textAlign='left'
                className={style['mt-40']}
              >
                Password
              </Typography>
              <TextFieldStyle1
                placeholder='Password'
                required
                onChange={handleOnChange}
                value={user.password}
                name='password'
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className={style['mt-20']}
                size='small'
              />
              <ButtonStyle2
                type='submit'
                className={style['mt-40']}
                onClick={onSubmit}
              >
                Đăng nhập
              </ButtonStyle2>
            </BoxColum>
            <Typography>{messageError}</Typography>
            <Typography
              style={{ color: '8d8d8d', fontSize: '12px' }}
              textAlign={'center'}
              className={style['mt-40']}
            >
              Bạn chưa có tài khoản
              <Link
                to={'/register'}
                style={{
                  textDecoration: 'none',
                  color: '#f54a00',
                }}
              >
                Đăng ký ngay
              </Link>
            </Typography>
            <div>
              <Divider
                className={`${style['divider']} ${style['mt-20']}`}
                sx={{
                  '& .MuiDivider-wrapper': {
                    backgroundColor: '#f2f5f9',
                  },
                }}
              >
                hoặc tiếp tục với
              </Divider>
            </div>

            <FacebookIcon
              className={`${style['mt-40']} ${style['icon']}`}
              sx={{
                margin: '0 auto',
              }}
            />
          </BoxColum>
        </Grid>
        <Grid
          item
          xs={1}
        ></Grid>
      </Grid>
    </React.Fragment>
  );
};
export default LoginPage;

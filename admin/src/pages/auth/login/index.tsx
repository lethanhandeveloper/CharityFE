import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { ButtonStyle2 } from '@common/Button';
import { BoxColum } from '@common/Box';
import { TextFieldStyle1 } from '@common/TextField';

import style from './auth.module.scss';
import serviceAPI from '@services/api/index';
import { UserAPI } from '@models/user';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUserInfo] = useState<UserAPI>({ useraccount: '', password: '' });
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigation = useNavigate();

  const token = localStorage.getItem('tokenAdmin');
  const dispatch = useAppDispatch();
  const onSubmit = async () => {
    try {
      const loginInfo = await serviceAPI.auth.login(user);
      if (loginInfo.status === 200) {
        if (loginInfo.data.result.role !== 4) {
          dispatch(
            setInfoAlert({ open: true, title: 'Không có quyền truy cập hệ thống!', type: 'error' }),
          );
        } else {
          localStorage.setItem('tokenAdmin', loginInfo.data.result.token);
          localStorage.setItem('role', loginInfo.data.result.role);
          navigation('/');
        }
      } else {
        dispatch(
          setInfoAlert({ open: true, title: 'Không có quyền truy cập hệ thống!', type: 'error' }),
        );
      }
    } catch (error) {
      dispatch(
        setInfoAlert({ open: true, title: 'Không có quyền truy cập hệ thống!', type: 'error' }),
      );
    }
  };

  const handleOnChange = (e: any) => {
    setUserInfo({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      {token && <Navigate to={'/'} />}
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

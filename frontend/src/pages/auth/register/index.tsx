import React, { useState } from 'react';

import { Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { BoxColum } from '@common/Box';
import { ButtonStyle2 } from '@common/Button';
import { TextFieldStyle1 } from '@common/TextField';

import style from '../auth.module.scss';

type RegisterValue = {
  email: string;
  password: string;
  fullname: string;
};
const RegisterPage = () => {
  const [data, setData] = useState<RegisterValue>({
    email: '',
    password: '',
    fullname: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = () => {
    console.log(data);
  };

  const handleOnChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <React.Fragment>
      <Grid container>
        <Grid
          item
          xs={6}
        >
          <div className={style['backgound-login']}></div>
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
              className={style['mt-40']}
            >
              Đăng nhập
            </Typography>

            <BoxColum>
              <Typography className={style['mt-40']}>Email</Typography>
              <TextFieldStyle1
                required
                size='small'
                type='email'
                className={style['mt-20']}
                name='email'
                onChange={handleOnChange}
              />
              <Typography className={style['mt-40']}>Họ và tên</Typography>
              <TextFieldStyle1
                required
                size='small'
                className={style['mt-20']}
                name='fullname'
                onChange={handleOnChange}
              />
              <Typography className={style['mt-40']}>Password</Typography>
              <TextFieldStyle1
                className={style['mt-20']}
                required
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
                size='small'
                name='password'
                onChange={handleOnChange}
              />
              <Typography className={style['mt-40']}>Xác nhận Password</Typography>
              <TextFieldStyle1
                required
                size='small'
                className={style['mt-20']}
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
                onChange={(e) => {
                  console.log(e);
                }}
              />
              <ButtonStyle2
                onClick={handleSubmit}
                className={style['mt-20']}
              >
                Tiếp tục
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
export default RegisterPage;

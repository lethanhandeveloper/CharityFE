import React, { useEffect, useState } from 'react';

import { Grid, Typography, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { BoxColum } from '@common/Box';
import { ButtonStyle2 } from '@common/Button';
import { TextFieldStyle1 } from '@common/TextField';

import style from '../auth.module.scss';
import serviceAPI from '@services/api';
import { SimpleValueKey } from 'models/meta';
import { useNavigate } from 'react-router';

export type RegisterValue = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  gender: string;
  age: number;
  provinceId: string;
  districtId: string;
  communeId: string;
  image_url: string;
  specificAddress: string;
};
const RegisterPage = () => {
  const [data, setData] = useState<RegisterValue>({
    email: '',
    password: '',
    name: '',
    districtId: '',
    provinceId: '',
    communeId: '',
    gender: 'male',
    age: 20,
    phoneNumber: '',
    specificAddress: '',
    image_url: 'https://i.pinimg.com/originals/6e/a6/f8/6ea6f87bd1266879a59c6d133d861616.png',
  });
  const [districtList, setDistrictList] = useState<SimpleValueKey[]>([]);
  const [communeList, setCommuneList] = useState<SimpleValueKey[]>([]);
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigative = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await serviceAPI.auth.register(data);
      if (response.status === 200) {
        //alert successs
        navigative('/login');
      } else {
        console.log('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const initDistrict = async () => {
      const districtAPI = await serviceAPI.location.getDistrictByProvince(data.provinceId);
      setDistrictList(
        districtAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    if (data.provinceId) initDistrict();
  }, [data.provinceId]);

  useEffect(() => {
    const initCommune = async () => {
      const districtAPI = await serviceAPI.location.getCommuneByDistrict(data.districtId);
      setCommuneList(
        districtAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    if (data.districtId) initCommune();
  }, [data.districtId]);

  useEffect(() => {
    const initProvince = async () => {
      const provinceAPI = await serviceAPI.location.getAllProvince();
      setProvinceList(
        provinceAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    initProvince();
  }, []);

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
              className={style['mt-20']}
            >
              Đăng nhập
            </Typography>

            <BoxColum>
              <Typography className={style['mt-20']}>Email</Typography>
              <TextFieldStyle1
                required
                size='small'
                type='email'
                name='email'
                onChange={handleOnChange}
              />
              <Typography className={style['mt-20']}>Họ và tên</Typography>
              <TextFieldStyle1
                required
                size='small'
                name='name'
                onChange={handleOnChange}
              />
              <Typography className={style['mt-20']}>Số điện thoại</Typography>
              <TextFieldStyle1
                required
                size='small'
                name='phoneNumber'
                onChange={handleOnChange}
              />
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    id='standard-select-currency'
                    label='Giới tính'
                    select
                    fullWidth
                    name='gender'
                    onChange={handleOnChange}
                    variant='standard'
                  >
                    {[
                      { value: 'male', label: 'Name' },
                      { value: 'female', label: 'Nữ' },
                    ].map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    id='standard-select-currency'
                    label='Tuổi'
                    select
                    name='age'
                    onChange={handleOnChange}
                    fullWidth
                    variant='standard'
                  >
                    {[
                      { value: 20, label: 20 },
                      { value: 21, label: 21 },
                    ].map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  xs={4}
                >
                  <TextField
                    id='standard-select-currency'
                    label='Tỉnh/TP'
                    select
                    fullWidth
                    onChange={(e) => {
                      setData({ ...data, provinceId: e.target.value });
                    }}
                    variant='standard'
                  >
                    {provinceList.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                      >
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={4}
                >
                  <TextField
                    id='standard-select-currency'
                    label='Quận/Huyện'
                    select
                    fullWidth
                    onChange={(e) => {
                      setData({ ...data, districtId: e.target.value });
                    }}
                    variant='standard'
                  >
                    {districtList.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                      >
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={4}
                >
                  <TextField
                    id='standard-select-currency'
                    label='Phường/Xã'
                    select
                    fullWidth
                    onChange={(e) => {
                      setData({ ...data, communeId: e.target.value });
                    }}
                    variant='standard'
                  >
                    {communeList.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                      >
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Typography className={style['mt-20']}>Password</Typography>
              <TextFieldStyle1
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
              <Typography className={style['mt-20']}>Xác nhận Password</Typography>
              <TextFieldStyle1
                required
                size='small'
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

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
import * as Yup from 'yup';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import ConfirmCode from './dialog';

export type RegisterValue = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  confirmPassword: string;
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
    confirmPassword: '',
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
  const [error, setErrors] = useState<any>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigative = useNavigate();
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email('Email không đúng định dạng').required('Nhập email'),
    password: Yup.string().required('Nhập mật khẩu'),
    name: Yup.string().required('Nhập họ và tên'),
    userName: Yup.string().required('Nhập nickname'),
    phoneNumber: Yup.string().required('Nhập số điện thoại'),
    age: Yup.number().required('Nhập tuổi'),
    gender: Yup.string().required('Chọn giới tính'),
    provinceId: Yup.string().required('Chọn tỉnh'),
    communeId: Yup.string().required('Chọn xã'),
    districtId: Yup.string().required('Chọn quận/huyện'),
    confirmPassword: Yup.string().equals([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
  });
  const handleSubmit = async (code: string) => {
    try {
      await validationSchema.validate(data, { abortEarly: false });
      const response = await serviceAPI.auth.register({ ...data, rgCode: code });
      if (response.status === 200) {
        navigative('/login');
      } else {
        dispatch(setInfoAlert({ open: true, title: 'Không thể tạo tài khoản', type: 'error' }));
      }
    } catch (error) {
      if ((error as any).name === 'ValidationError') {
        const errors = (error as any).inner.reduce((acc: any, err: any) => {
          acc[err.path] = err.message;
          return acc;
        }, {});

        setErrors(errors);
      }
      dispatch(setInfoAlert({ open: true, title: 'Không thể tạo tài khoản', type: 'error' }));
    }
  };
  const handleSendEmail = async () => {
    const response = await serviceAPI.auth.sendEmail(data.email);
    if (response.status === 200) {
      dispatch(
        setInfoAlert({
          open: true,
          title: 'Gửi mã thành công, vui lòng kiểm tra email',
          type: 'success',
        }),
      );
      setOpenDialog(true);
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
              Đăng ký tài khoản
            </Typography>

            <BoxColum>
              <Typography className={style['mt-20']}>Email</Typography>
              <TextFieldStyle1
                size='small'
                name='email'
                onChange={handleOnChange}
                error={Boolean(error?.email)}
                helperText={error?.email}
              />
              <Typography className={style['mt-20']}>Họ và tên</Typography>
              <TextFieldStyle1
                size='small'
                name='name'
                onChange={handleOnChange}
                error={Boolean(error?.name)}
                helperText={error?.name}
              />
              <Typography className={style['mt-20']}>Nick name</Typography>
              <TextFieldStyle1
                size='small'
                name='userName'
                onChange={handleOnChange}
                error={Boolean(error?.userName)}
                helperText={error?.userName}
              />
              <Typography className={style['mt-20']}>Số điện thoại</Typography>
              <TextFieldStyle1
                size='small'
                name='phoneNumber'
                onChange={handleOnChange}
                error={Boolean(error?.phoneNumber)}
                helperText={error?.phoneNumber}
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
                    value={data.gender}
                    error={Boolean(error?.gender)}
                    helperText={error?.gender}
                    name='gender'
                    onChange={handleOnChange}
                    variant='standard'
                  >
                    {[
                      { value: 'male', label: 'Nam' },
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
                    type='number'
                    value={data.age}
                    name='age'
                    onChange={handleOnChange}
                    fullWidth
                    variant='standard'
                    error={Boolean(error?.age)}
                    helperText={error?.age}
                  />
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
                    error={Boolean(error?.provinceId)}
                    helperText={error?.provinceId}
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
                    error={Boolean(error?.districtId)}
                    helperText={error?.districtId}
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
                    error={Boolean(error?.communeId)}
                    helperText={error?.communeId}
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
                error={Boolean(error?.password)}
                helperText={error?.password}
              />
              <Typography className={style['mt-20']}>Xác nhận Password</Typography>
              <TextFieldStyle1
                name='confirmPassword'
                size='small'
                onChange={handleOnChange}
                error={Boolean(error?.confirmPassword)}
                helperText={error?.confirmPassword}
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
              />
              <ButtonStyle2
                onClick={handleSendEmail}
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
      {openDialog && (
        <ConfirmCode
          open={openDialog}
          handleSubmit={handleSubmit}
          handleClose={() => setOpenDialog(false)}
        />
      )}
    </React.Fragment>
  );
};
export default RegisterPage;

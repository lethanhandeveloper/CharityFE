import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EditTwoTone } from '@mui/icons-material';
import { Grid, MenuItem } from '@mui/material';
import { UserUI } from 'models/user';
import { RegisterValue } from '@pages/auth/register';
import { SimpleValueKey } from 'models/meta';
import serviceAPI from '@services/api';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { ButtonCancel, ButtonConfirm } from '@common/Button';
import DialogChangePass from './Password';
interface EditInfoDialogProps {
  data: UserUI;
}

const EditInfoDialog = (props: EditInfoDialogProps) => {
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  const [districtList, setDistrictList] = useState<SimpleValueKey[]>([]);
  const [communeList, setCommuneList] = useState<SimpleValueKey[]>([]);
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const dispatch = useAppDispatch();
  const [userData, setUserData] = React.useState<RegisterValue>({
    age: data.age,
    email: data.email,
    name: data.fullname,
    communeId: data.communeId,
    districtId: '',
    gender: data.gender,
    image_url: data.imageUrl,
    password: '',
    confirmPassword: '',
    phoneNumber: data.phoneNumber,
    provinceId: '',
    specificAddress: data.specificAddress,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleUpdateProfile = async () => {
    try {
      const response = await serviceAPI.auth.updateProfile(userData);
      dispatch(setInfoAlert({ open: true, title: response.data.message, type: 'success' }));
      handleClose();
    } catch (error) {
      dispatch(setInfoAlert({ open: true, title: 'Không thể cập nhật ảnh', type: 'error' }));
    }
  };

  useEffect(() => {
    const initDistrict = async () => {
      const districtAPI = await serviceAPI.location.getDistrictByProvince(userData.provinceId);
      setDistrictList(
        districtAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    if (userData.provinceId) initDistrict();
  }, [userData.provinceId]);

  useEffect(() => {
    const initCommune = async () => {
      const districtAPI = await serviceAPI.location.getCommuneByDistrict(userData.districtId);
      setCommuneList(
        districtAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    if (userData.districtId) initCommune();
  }, [userData.districtId]);

  useEffect(() => {
    const initProvince = async () => {
      const provinceAPI = await serviceAPI.location.getAllProvince();
      setProvinceList(
        provinceAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    initProvince();
  }, []);

  const handleGetProvinceID = () => {
    const provinceID = provinceList.find((item) => item.value === data.province)?.id;
    if (provinceID) setUserData({ ...userData, provinceId: provinceID });
    return provinceID;
  };

  const handleGetDistrictID = () => {
    const districtID = districtList.find((item) => item.value === data.district)?.id;
    if (districtID) setUserData({ ...userData, districtId: districtID });
    return districtID;
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        variant='contained'
        startIcon={<EditTwoTone />}
      >
        Cập nhật
      </Button>
      <DialogChangePass />
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Cập nhật thông tin</DialogTitle>
        <DialogContent>
          <DialogContentText>Hệ thống cập nhật thông tin chi tiết</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Họ và tên'
            name='name'
            value={userData.name}
            fullWidth
            variant='standard'
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            name='email'
            value={userData.email}
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Số điện thoại'
            fullWidth
            name='phoneNumber'
            value={userData.phoneNumber}
            variant='standard'
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
                value={userData.gender}
                onChange={handleChange}
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
                select
                name='age'
                type='number'
                value={userData.age}
                onChange={handleChange}
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
                onChange={handleChange}
                value={userData.provinceId || handleGetProvinceID()}
                name='provinceId'
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
                name='districtId'
                onChange={handleChange}
                value={userData.districtId || handleGetDistrictID()}
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
                onChange={handleChange}
                value={userData.communeId}
                name='communeId'
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
        </DialogContent>
        <DialogActions>
          <ButtonCancel onClick={handleClose}>Hủy</ButtonCancel>
          <ButtonConfirm onClick={handleUpdateProfile}>Cập nhật</ButtonConfirm>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default EditInfoDialog;

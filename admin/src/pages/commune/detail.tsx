import PanelDetail from '@common/Panel';
import { CommuneUI } from '@models/area';
import { SimpleValueKey } from '@models/meta';

import { Button, Grid, MenuItem, TextField } from '@mui/material';
import serviceAPI from '@services/api';

import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { useEffect, useState } from 'react';

interface DetailCommuneProps {
  data: CommuneUI;
  openDetail: boolean;
  onClose: () => void;
  loadTable: () => void;
}
const DetailCommune = (props: DetailCommuneProps) => {
  const { data, openDetail, onClose, loadTable } = props;
  const [detail, setDetail] = useState<CommuneUI>(data);
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const [districtList, setDistrictList] = useState<SimpleValueKey[]>([]);
  const [provinceSelected, setProvinceSelected] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const onSave = async () => {
    try {
      const response = await serviceAPI.commune.create(detail);
      if (response.status === 200) {
        dispatch(setInfoAlert({ title: 'Tạo banner thành công!', open: true, type: 'success' }));
        onClose();
        loadTable();
      } else {
        dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
    }
  };

  useEffect(() => {
    const initProvince = async () => {
      const provinceAPI = await serviceAPI.location.getAllProvince();
      setProvinceList(
        provinceAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    initProvince();
  }, []);
  useEffect(() => {
    const initDistrict = async () => {
      const districtAPI = await serviceAPI.location.getDistrictByProvince(provinceSelected);
      setDistrictList(
        districtAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    if (provinceSelected) initDistrict();
  }, [provinceSelected]);
  return (
    <>
      <PanelDetail
        title={'Chi tiết banner'}
        buttonChildren={
          <Grid container>
            <Grid item>
              <Button onClick={onClose}>Đóng</Button>
            </Grid>
            <Grid item>
              <Button onClick={onSave}>Save</Button>
            </Grid>
          </Grid>
        }
        open={openDetail}
      >
        <Grid
          container
          gap={3}
        >
          <Grid
            item
            xs={12}
          >
            <TextField
              value={detail.name}
              label='Tên'
              fullWidth
              name='name'
              size='small'
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              id='standard-select-currency'
              label='Tỉnh/TP'
              select
              fullWidth
              onChange={(e) => {
                setProvinceSelected(e.target.value);
              }}
              value={provinceSelected}
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
            xs={12}
          >
            <TextField
              id='standard-select-currency'
              label='Quận/Huyện'
              select
              fullWidth
              name='districtId'
              onChange={handleChange}
              value={detail.districtId}
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
        </Grid>
      </PanelDetail>
    </>
  );
};
export default DetailCommune;

import PanelDetail from '@common/Panel';
import { DistrictUI } from '@models/area';
import { SimpleValueKey } from '@models/meta';

import { Button, Grid, MenuItem, TextField } from '@mui/material';
import serviceAPI from '@services/api';

import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { useEffect, useState } from 'react';

interface DetailDistrictProps {
  data: DistrictUI;
  openDetail: boolean;
  onClose: () => void;
  loadTable: () => void;
}

const DetailDistrict = (props: DetailDistrictProps) => {
  const { data, openDetail, onClose, loadTable } = props;
  const [detail, setDetail] = useState<DistrictUI>(data);
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const onSave = async () => {
    try {
      let response;
      if (data.id) {
        response = await serviceAPI.district.update(detail);
      } else {
        response = await serviceAPI.district.create(detail);
      }
      if (response.status === 200) {
        dispatch(setInfoAlert({ title: 'Cập nhật thành công!', open: true, type: 'success' }));
        onClose();
        loadTable();
      } else if (response.status === 201) {
        dispatch(setInfoAlert({ title: 'Tạo mới thành công!', open: true, type: 'success' }));
      } else {
        dispatch(setInfoAlert({ title: 'Không thể thao tác!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể thao tác!', open: true, type: 'error' }));
    }
  };
  useEffect(() => {
    const initData = async () => {
      const result = await serviceAPI.province.getList();
      setProvinceList(
        result.data.result.map((item: any) => ({
          id: item._id,
          value: item.name,
        })),
      );
    };
    initData();
  }, []);
  return (
    <>
      <PanelDetail
        title={'Chi tiết huyện'}
        buttonChildren={
          <Grid
            container
            justifyContent={'space-between'}
          >
            <Grid item>
              <Button
                onClick={onClose}
                variant='outlined'
              >
                Đóng
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={onSave}
                variant='contained'
              >
                Lưu
              </Button>
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
              id='standard-select-currency'
              label='Tỉnh'
              select
              fullWidth
              name='provinceId'
              onChange={handleChange}
              value={detail.provinceId}
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
              value={detail.name}
              label='Tên đường'
              fullWidth
              name='name'
              size='small'
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </PanelDetail>
    </>
  );
};
export default DetailDistrict;

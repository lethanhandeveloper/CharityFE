import PanelDetail from '@common/Panel';
import { ProvinceUI } from '@models/area';

import { Button, Grid, TextField } from '@mui/material';
import serviceAPI from '@services/api';

import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { useState } from 'react';

interface DetailProvinceProps {
  data: ProvinceUI;
  openDetail: boolean;
  onClose: () => void;
  loadTable: () => void;
}
const DetailProvince = (props: DetailProvinceProps) => {
  const { data, openDetail, onClose, loadTable } = props;
  const [detail, setDetail] = useState<ProvinceUI>(data);
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const onSave = async () => {
    try {
      const response = await serviceAPI.province.create(detail);
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
        </Grid>
      </PanelDetail>
    </>
  );
};
export default DetailProvince;

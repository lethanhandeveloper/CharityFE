import PanelDetail from '@common/Panel';
import TypographyLabel from '@components/Typography';
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
      let response;
      if (!detail.id) {
        response = await serviceAPI.province.create(detail);
      } else {
        response = await serviceAPI.province.update(detail);
      }
      if (response.status === 200) {
        dispatch(setInfoAlert({ title: response.data.message, open: true, type: 'success' }));
        onClose();
        loadTable();
      } else {
        dispatch(setInfoAlert({ title: response.data.message, open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể tạo cập thông tin!', open: true, type: 'error' }));
    }
  };
  return (
    <>
      <PanelDetail
        title={'Chi tiết tỉnh'}
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
            <TypographyLabel>Tên tỉnh</TypographyLabel>
            <TextField
              value={detail.name}
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

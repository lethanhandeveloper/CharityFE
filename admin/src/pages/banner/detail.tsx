import PanelDetail from '@common/Panel';
import { BannerUI } from '@models/banner';

import { Avatar, Box, Button, Grid, Switch, TextField } from '@mui/material';
import serviceAPI from '@services/api';
import Upload from '@services/firebase';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { useState } from 'react';

interface DetailBannerProps {
  data: BannerUI;
  openDetail: boolean;
  onClose: () => void;
  loadTable: () => void;
}
const DetailBanner = (props: DetailBannerProps) => {
  const { data, openDetail, onClose, loadTable } = props;
  const [detail, setDetail] = useState<BannerUI>(data);
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const onSave = async () => {
    try {
      let response;
      if (detail.id) {
        response = await serviceAPI.banner.updateBanner(detail);
      } else {
        response = await serviceAPI.banner.createBanner(detail);
      }

      if (response.status === 201) {
        dispatch(setInfoAlert({ title: 'Tạo banner thành công!', open: true, type: 'success' }));
        onClose();
        loadTable();
      } else if (response.status === 200) {
        dispatch(setInfoAlert({ title: 'Cập nhật thành công!', open: true, type: 'success' }));
        onClose();
        loadTable();
      } else {
        dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Hệ thống lỗi', open: true, type: 'error' }));
    }
  };
  return (
    <>
      <PanelDetail
        title={'Chi tiết banner'}
        buttonChildren={
          <Grid
            container
            justifyContent={'space-between'}
          >
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
            justifyContent={'center'}
            display={'flex'}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Avatar
                src={detail.imageUrl}
                sx={{ width: 100, height: 100 }}
              />
              <Upload
                setUrl={(url) => {
                  setDetail({ ...detail, imageUrl: url });
                }}
                className='banner'
                folder='avatar'
                type='image/*'
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              value={detail.title}
              label='Tiêu đề'
              fullWidth
              name='title'
              size='small'
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              value={detail.description}
              label='Mô tả'
              fullWidth
              name='description'
              size='small'
              onChange={handleChange}
            />
          </Grid>

          <Switch
            checked={detail.isActive}
            onChange={() => {
              setDetail({ ...detail, isActive: !detail.isActive });
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Grid>
      </PanelDetail>
    </>
  );
};
export default DetailBanner;

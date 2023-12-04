import PanelDetail from '@common/Panel';

import { CampainUI } from '@models/campain';

import { Avatar, Box, Button, Grid, TextField } from '@mui/material';
import serviceAPI from '@services/api';

import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { useState } from 'react';

interface DetailCampaignProps {
  data: CampainUI;
  openDetail: boolean;
  onClose: () => void;
  loadTable: () => void;
}
const DetailCampaign = (props: DetailCampaignProps) => {
  const { data, openDetail, onClose, loadTable } = props;
  const [detail, setDetail] = useState<CampainUI>(data);
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const onSave = async () => {
    try {
      const response = await serviceAPI.banner.createBanner(detail);
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
            justifyContent={'center'}
            display={'flex'}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Avatar
                src={detail.thumbnail}
                sx={{ width: 100, height: 100 }}
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
        </Grid>
      </PanelDetail>
    </>
  );
};
export default DetailCampaign;

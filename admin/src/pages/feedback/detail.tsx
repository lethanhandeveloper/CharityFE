import PanelDetail from '@common/Panel';
import { FeedbackUI } from '@models/feedback';

import { Box, Button, Grid, TextField } from '@mui/material';
import serviceAPI from '@services/api';

import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { useState } from 'react';

interface DetailFeedBackProps {
  data: FeedbackUI;
  openDetail: boolean;
  onClose: () => void;
  loadTable: () => void;
}
const DetailFeedBack = (props: DetailFeedBackProps) => {
  const { data, openDetail, onClose, loadTable } = props;
  const [detail, setDetail] = useState<FeedbackUI>(data);
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
        dispatch(setInfoAlert({ title: 'Tạo đánh giá thành công!', open: true, type: 'success' }));
        onClose();
        loadTable();
      } else if (response.status === 200) {
        dispatch(setInfoAlert({ title: 'Cập nhật thành công!', open: true, type: 'success' }));
        onClose();
        loadTable();
      } else {
        dispatch(setInfoAlert({ title: 'Không thể tạo đánh giá!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Hệ thống lỗi', open: true, type: 'error' }));
    }
  };
  return (
    <>
      <PanelDetail
        title={'Chi tiết đánh giá'}
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
            justifyContent={'center'}
            display={'flex'}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            ></Box>
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
              value={detail.content}
              label='Mô tả'
              fullWidth
              rows={4}
              name='content'
              size='small'
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </PanelDetail>
    </>
  );
};
export default DetailFeedBack;

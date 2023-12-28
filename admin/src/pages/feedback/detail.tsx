import PanelDetail from '@common/Panel';
import { FeedbackUI } from '@models/feedback';

import { Autocomplete, Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import serviceAPI from '@services/api';
import { Editor } from '@tinymce/tinymce-react';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { useEffect, useState } from 'react';
import { mapUsersUI } from '@services/mapdata/user';
import { UserUI } from '@models/user';

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
  const [userList, setUserList] = useState<UserUI[]>([]);
  const handleChange = (e: any) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const onSave = async () => {
    try {
      let response;
      if (detail.id) {
        response = await serviceAPI.feedback.updateFeedback(detail.id, detail);
      } else {
        response = await serviceAPI.feedback.createFeedback(detail);
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
  useEffect(() => {
    const initData = async () => {
      try {
        const response = await serviceAPI.auth.getUserList();
        setUserList(mapUsersUI(response.data.result));
      } catch (err) {
        console.log(err);
      }
    };
    initData();
  }, []);
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
            {' '}
            <Autocomplete
              id='country-select-demo'
              sx={{ width: 260 }}
              options={userList}
              autoHighlight
              onChange={(e, value) => console.log(value)}
              getOptionLabel={(option) => option.email}
              renderOption={(props, option) => (
                <Box
                  component='li'
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <Avatar src={option.imageUrl} />
                  <Typography>{option.fullname}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Người quyên góp'
                />
              )}
            />
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
            <Editor
              apiKey='km13aeu743orqcw7bikjee45mf4gymp1zxsnu73aoz6nwbfh'
              onEditorChange={(e) => {
                setDetail({ ...data, content: e });
              }}
              init={{
                plugins:
                  'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar:
                  'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
              }}
              initialValue='Welcome to TinyMCE!'
            />
          </Grid>
        </Grid>
      </PanelDetail>
    </>
  );
};
export default DetailFeedBack;

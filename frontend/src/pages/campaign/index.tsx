import {
  Box,
  CardMedia,
  Typography,
  Card,
  Divider,
  Grid,
  CardContent,
  TextField,
  MenuItem,
  CardActions,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { DateCalendar } from '@mui/x-date-pickers';
import { SimpleValueKey } from '@services/models/meta';
import serviceAPI from '@services/api';
import Upload from '@services/firebase';
import { Campain } from '@services/models/campain';
import { ButtonStyle1 } from '@common/Button';
import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch, useAppSelector } from '@store/hook';

function CampainPage() {
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const [categoryList, setCategoryList] = useState<SimpleValueKey[]>([]);
  const [itemTypeList, setItemTypeList] = useState<SimpleValueKey[]>([]);

  const [url, setUrl] = useState<string>();
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alert);
  const [fileUrl, setFileUrl] = useState<string>();
  const [data, setData] = useState<Campain>({
    categoryId: '',
    creatorId: '',
    description: '',
    endDate: new Date(),
    itemTypeId: '',
    provinceId: '',
    targetValue: 0,
    thumbnail: '',
    title: '',
    fileUrl: '',
  });

  useEffect(() => {
    const initProvince = async () => {
      const [provinceAPI, categoryAPI, itemAPI] = await Promise.all([
        serviceAPI.location.getAllProvince(),
        serviceAPI.campain.getCategory(),
        serviceAPI.campain.getItemType(),
      ]);
      setProvinceList(
        provinceAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );

      setCategoryList(
        categoryAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );

      setItemTypeList(itemAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })));
    };
    initProvince();
  }, []);

  useEffect(() => {
    if (!url) return;
    setData({ ...data, thumbnail: url });
  }, [url]);

  useEffect(() => {
    if (!fileUrl) return;
    setData({ ...data, fileUrl: fileUrl });
  }, [fileUrl]);

  useEffect(() => {
    console.log(alert);
  }, [alert]);

  const handleSubmit = () => {
    // const response = await serviceAPI.campain.createCampain(data);
    // if (response.status === 200) {
    //   console.log(response.data.message);
    // }
    dispatch(setInfoAlert({ open: true, title: 'test test test test ', type: 'success' }));
  };

  return (
    <React.Fragment>
      <Card>
        <CardMedia
          sx={{ minHeight: 280 }}
          image='/static/images/placeholders/covers/6.jpg'
          title='Card Cover'
        />
      </Card>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
        >
          <Card>
            <Box
              p={3}
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Box>
                <Typography
                  variant='h4'
                  gutterBottom
                >
                  Thông tin chi tiết
                </Typography>
                <Typography variant='subtitle2'>
                  Manage informations related to your personal details
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant='subtitle2'>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                  >
                    <Typography>Tiêu điều</Typography>
                    <TextField
                      autoFocus
                      margin='dense'
                      id='name'
                      fullWidth
                      name='title'
                      variant='standard'
                    />
                    <Typography>Mục tiêu</Typography>
                    <TextField
                      autoFocus
                      margin='dense'
                      id='name'
                      type='number'
                      fullWidth
                      name='target'
                      variant='standard'
                    />
                    <Typography>Ngày kết thúc</Typography>
                    <DateCalendar
                      disablePast
                      defaultValue={new Date()}
                    />
                    <Typography>Loại</Typography>
                    <Grid
                      container
                      spacing={3}
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
                          label='Danh mục'
                          select
                          fullWidth
                          variant='standard'
                        >
                          {categoryList.map((option) => (
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
                          label='Loại'
                          select
                          fullWidth
                          variant='standard'
                        >
                          {itemTypeList.map((option) => (
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
                    <Typography>Ảnh banner</Typography>
                    <Box
                      sx={{
                        position: 'relative',
                      }}
                    >
                      <CardMedia
                        sx={{ minHeight: 280 }}
                        image={url}
                        title='Card Cover'
                      />
                      <Upload
                        className='image'
                        setUrl={setUrl}
                        type='image/*'
                        folder='avatar'
                      />
                    </Box>
                    <Typography>File xác thực của địa phương</Typography>
                    <Box
                      sx={{
                        position: 'relative',
                      }}
                    >
                      <object
                        data={fileUrl}
                        style={{
                          width: '100%',
                          height: '30vh',
                        }}
                        type='application/pdf'
                      />
                      <Upload
                        className='pdf'
                        setUrl={setFileUrl}
                        type='application/pdf'
                        folder='file'
                      />
                    </Box>
                    <Typography>Mô tả chi tiết</Typography>
                    <Editor
                      apiKey='km13aeu743orqcw7bikjee45mf4gymp1zxsnu73aoz6nwbfh'
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
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonStyle1 onClick={handleSubmit}>Xác thực</ButtonStyle1>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CampainPage;

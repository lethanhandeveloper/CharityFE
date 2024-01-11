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
  InputAdornment,
  IconButton,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { DateCalendar } from '@mui/x-date-pickers';
import { SimpleValueKey } from 'models/meta';
import serviceAPI from '@services/api';
import Upload from '@services/firebase';
import { Campain } from 'models/campain';
import { ButtonStyle1 } from '@common/Button';
import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch } from '@store/hook';
// import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import MapCampaignPage, { getAddress } from '@pages/map/indexcampaign';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
// const validationSchema = Yup.object({
//   categoryId: Yup.string().required('Chọn danh mục'),
//   description: Yup.string().required('Nhập mô tả chiến dịch'),
//   // endDate: Yup.date().required('Chọn ngày kết thúc'),
//   itemTypeId: Yup.string().required('Chọn loại'),
//   provinceId: Yup.string().required('Chọn tỉnh thành'),
//   targetValue: Yup.number().min(10000000, 'Chiến dịch không thấp hơn 10,000,000'),
//   thumbnail: Yup.string().required('Chọn ảnh'),
//   title: Yup.string().required('Nhập tiêu đề'),
//   fileUrl: Yup.string().required('Chọn file xác thực'),
// });
const CampaignCreatePage = () => {
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const [categoryList, setCategoryList] = useState<SimpleValueKey[]>([]);
  const [itemTypeList, setItemTypeList] = useState<SimpleValueKey[]>([]);

  const [error, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<Campain>({
    _id: '',
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
    status: 'DRAFT',
    addressCreator: '',
    specialAddress: '',
    lat: 0,
    long: 0,
    type: '',
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

  const handleSubmit = async () => {
    try {
      // await validationSchema.validate(data, { abortEarly: false });
      const response = await serviceAPI.campain.createCampain(data);
      if (response.status === 201) {
        dispatch(setInfoAlert({ open: true, title: 'Tạo chiến dịch thành công', type: 'success' }));
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    } catch (error) {
      if ((error as any).name === 'ValidationError') {
        const errors = (error as any).inner.reduce((acc: any, err: any) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(errors);
      } else {
        dispatch(setInfoAlert({ open: true, title: 'Không thể tạo chiến dịch', type: 'error' }));
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSearch = async () => {
    const address = await getAddress(data.specialAddress);
    if (address) {
      setData({ ...data, lat: address.lat, long: address.long });
    } else {
      setData({ ...data, lat: 0, long: 0 });
    }
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
        sx={{ padding: '20px 100px 20px 100px ' }}
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
                  style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                  variant='h4'
                  gutterBottom
                >
                  Thông tin chi tiết
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography
                style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                variant='subtitle2'
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                  >
                    <Typography
                      style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                    >
                      Tiêu đề
                    </Typography>
                    <TextField
                      autoFocus
                      margin='dense'
                      onChange={handleChange}
                      fullWidth
                      name='title'
                      variant='standard'
                      error={Boolean(error?.title)}
                      helperText={error?.title}
                    />
                    <Typography
                      style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                    >
                      Địa chỉ ví
                    </Typography>
                    <TextField
                      autoFocus
                      margin='dense'
                      onChange={handleChange}
                      fullWidth
                      name='addressWallet'
                      variant='standard'
                    />
                    <Grid
                      container
                      spacing={3}
                      alignItems={'center'}
                    >
                      <Grid
                        item
                        xs={3}
                      >
                        <Typography
                          style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                        >
                          Mục tiêu
                        </Typography>
                        <TextField
                          autoFocus
                          margin='dense'
                          onChange={handleChange}
                          type='number'
                          fullWidth
                          name='target'
                          variant='standard'
                          error={Boolean(error?.target)}
                          helperText={error?.target}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={3}
                      >
                        <Typography
                          style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                        >
                          Tỉnh/TP
                        </Typography>
                        <TextField
                          id='standard-select-currency'
                          select
                          name='provinceId'
                          onChange={handleChange}
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
                        xs={3}
                      >
                        <Typography
                          style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                        >
                          Danh mục
                        </Typography>
                        <TextField
                          id='standard-select-currency'
                          select
                          name='categoryId'
                          onChange={handleChange}
                          fullWidth
                          error={Boolean(error?.categoryId)}
                          helperText={error?.categoryId}
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
                        xs={3}
                      >
                        <Typography
                          style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                        >
                          Loại
                        </Typography>
                        <TextField
                          id='standard-select-currency'
                          select
                          name='itemTypeId'
                          onChange={handleChange}
                          fullWidth
                          error={Boolean(error?.itemTypeId)}
                          helperText={error?.itemTypeId}
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
                      <Grid
                        item
                        xs={12}
                      >
                        <Typography
                          style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                        >
                          Địa chỉ cụ thể
                        </Typography>
                        <TextField
                          autoFocus
                          margin='dense'
                          onChange={handleChange}
                          fullWidth
                          name='specialAddress'
                          variant='standard'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {data.lat !== 0 ? (
                                  <TaskAltIcon color='success' />
                                ) : (
                                  <IconButton
                                    onClick={() => {
                                      handleSearch();
                                    }}
                                  >
                                    <CheckCircleOutlineIcon />
                                  </IconButton>
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                        <MapCampaignPage
                          lat={data?.lat || 0}
                          long={data?.long || 0}
                        />
                      </Grid>
                    </Grid>

                    <Typography
                      style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                    >
                      Ngày kết thúc
                    </Typography>
                    <DateCalendar
                      disablePast
                      onChange={(e) => {
                        setData({ ...data, endDate: e || new Date() });
                      }}
                      value={data?.endDate ? new Date(data?.endDate) : new Date()}
                    />

                    <Typography
                      style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                    >
                      Ảnh banner
                    </Typography>
                    <Box
                      sx={{
                        position: 'relative',
                      }}
                    >
                      <CardMedia
                        sx={{ minHeight: 280 }}
                        image={data.thumbnail}
                        title='Card Cover'
                      />

                      <Upload
                        className='image'
                        setUrl={(url: string) => {
                          setData({ ...data, thumbnail: url });
                        }}
                        type='image/*'
                        folder='avatar'
                      />
                    </Box>
                    <Typography
                      style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                    >
                      File xác thực của địa phương
                    </Typography>
                    <Box
                      sx={{
                        position: 'relative',
                      }}
                    >
                      <object
                        data={data.fileUrl}
                        style={{
                          width: '100%',
                          height: '30vh',
                        }}
                        type='application/pdf'
                      />
                      <Upload
                        className='pdf'
                        setUrl={(url: string) => {
                          setData({ ...data, fileUrl: url });
                        }}
                        type='application/pdf'
                        folder='file'
                      />
                    </Box>
                    <Typography
                      style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                    >
                      Mô tả chi tiết
                    </Typography>
                    <Editor
                      apiKey='km13aeu743orqcw7bikjee45mf4gymp1zxsnu73aoz6nwbfh'
                      onEditorChange={(e) => {
                        setData({ ...data, description: e });
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
              </Typography>
            </CardContent>
            <CardActions>
              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ButtonStyle1 onClick={handleSubmit}>Gửi yêu cầu</ButtonStyle1>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CampaignCreatePage;

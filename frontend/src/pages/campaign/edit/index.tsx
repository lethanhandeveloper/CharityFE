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
import { SimpleValueKey } from 'models/meta';
import serviceAPI from '@services/api';
import Upload from '@services/firebase';
import { Campain } from 'models/campain';
import { ButtonStyle1 } from '@common/Button';
import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch } from '@store/hook';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router';

const validationSchema = Yup.object({
  categoryId: Yup.string().required('Chọn danh mục'),
  description: Yup.string().required('Nhập mô tả chiến dịch'),
  endDate: Yup.date().required('Chọn ngày kết thúc'),
  itemTypeId: Yup.string().required('Chọn loại'),
  provinceId: Yup.string().required('Chọn tỉnh thành'),
  targetValue: Yup.number().min(10000000, 'Chiến dịch không thấp hơn 10,000,000'),
  thumbnail: Yup.string().required('Chọn ảnh'),
  title: Yup.string().required('Nhập tiêu đề'),
  fileUrl: Yup.string().required('Chọn file xác thực'),
});
const CampaignEditPage = () => {
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const [categoryList, setCategoryList] = useState<SimpleValueKey[]>([]);
  const [itemTypeList, setItemTypeList] = useState<SimpleValueKey[]>([]);
  const [error, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
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
    addressWallet: '',
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
    const initData = async () => {
      if (id) {
        const response = await serviceAPI.campain.getCampainDetail(id);
        setData({ ...response.data.result });
      }
    };
    initData();
  }, [id]);
  const handleSubmit = async () => {
    try {
      await validationSchema.validate(data, { abortEarly: false });
      const response = await serviceAPI.campain.createCampain(data);
      if (response.status === 200) {
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
                      value={data.title}
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
                      value={data.addressWallet}
                      name='addressWallet'
                      variant='standard'
                      error={Boolean(error?.title)}
                      helperText={error?.title}
                    />
                    <Typography
                      style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                    >
                      Mục tiêu
                    </Typography>
                    <TextField
                      autoFocus
                      margin='dense'
                      value={data.targetValue}
                      onChange={handleChange}
                      type='number'
                      fullWidth
                      name='target'
                      variant='standard'
                      error={Boolean(error?.target)}
                      helperText={error?.target}
                    />
                    <Typography
                      style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}
                    >
                      Ngày kết thúc
                    </Typography>
                    <DateCalendar
                      disablePast
                      value={new Date(data.endDate)}
                      onChange={(e) => {
                        setData({ ...data, endDate: e || new Date() });
                      }}
                      defaultValue={new Date()}
                    />
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
                          value={data.provinceId}
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
                        xs={4}
                      >
                        <TextField
                          id='standard-select-currency'
                          label='Danh mục'
                          select
                          value={data.categoryId}
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
                        xs={4}
                      >
                        <TextField
                          id='standard-select-currency'
                          label='Loại'
                          select
                          value={data.itemTypeId}
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
                    </Grid>
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
                      value={data.description}
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
                <ButtonStyle1 onClick={handleSubmit}>Cập nhật</ButtonStyle1>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CampaignEditPage;

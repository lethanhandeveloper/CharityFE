import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { SearchTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import serviceAPI from '@services/api';
import { mapCampainUIs } from '@mapdata/campain';
import { CampainUI } from '@models/campain';
import { SimpleValueKey } from '@models/meta';
import { ButtonCancel, ButtonConfirm, ButtonStyle1 } from '@common/Button';
import ProgressCustom from '@common/Progess';

import TypographyTitle from '@common/Typography';
import { LinkCustom } from '@common/Link';
import campaign from '@services/ethers/campaign';
import ExtendedWindow from '@models/ether';
import { ethers } from 'ethers';
export interface SearchStructure {
  id: string;
  categoryId: string;
  provinceId: string;
  search_text: string;
  page: number;
  no_item_per_page: number;
}
const CampaignTable = ({ id, isCurrent }: { id: string; isCurrent?: boolean }) => {
  const [campainList, setCampainList] = useState<CampainUI[]>([]);
  const [provinceList, setProvinceList] = useState<SimpleValueKey[]>([]);
  const [categoryList, setCategoryList] = useState<SimpleValueKey[]>([]);
  const refInput = useRef<HTMLInputElement | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [transfer, setTransfer] = useState({
    number: 0,
    message: '',
    id: '',
  });
  const [searchConfig, setSearchConfig] = useState<SearchStructure>({
    id: id,
    categoryId: '',
    provinceId: '',
    search_text: '',
    page: 1,
    no_item_per_page: 5,
  });

  const calculatePercent = (current: number, target: number): number => {
    return Number(((current / target) * 100).toFixed(2));
  };

  const initData = async () => {
    let dataMapUI;
    if (!isCurrent) {
      const response = await serviceAPI.campain.getCampainListByUser(searchConfig);
      dataMapUI = mapCampainUIs(response.data.result);
    } else {
      const response = await serviceAPI.campain.getCampainListByCurentUser(searchConfig);
      dataMapUI = mapCampainUIs(response.data.result);
    }

    setCampainList([...dataMapUI]);
  };

  const handleGetMoreItem = () => {
    setSearchConfig({ ...searchConfig, page: searchConfig.page + 1 });
  };

  const handleChange = (e: any) => {
    setSearchConfig({ ...searchConfig, [e.target.name]: e.target.value });
  };

  const calculateDayCountDown = (endDate: Date): number => {
    return Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / 1000 / 60 / 24);
  };

  useEffect(() => {
    initData();
  }, [searchConfig]);

  useEffect(() => {
    const initProvince = async () => {
      const [provinceAPI, categoryAPI] = await Promise.all([
        serviceAPI.location.getAllProvince(),
        serviceAPI.campain.getCategory(),
      ]);
      setProvinceList(
        provinceAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
      setCategoryList(
        categoryAPI.data.result.map((item: any) => ({ id: item._id, value: item.name })),
      );
    };
    initProvince();
  }, []);

  const withDraw = async (id: string) => {
    try {
      // Request account access if needed
      await (window as ExtendedWindow).ethereum.request({ method: 'eth_requestAccounts' });

      // Use MetaMask provider
      const provider = new ethers.providers.Web3Provider((window as ExtendedWindow).ethereum);

      // Get signer (account) from provider
      const signer = provider.getSigner();

      // Get the user's Ethereum address
      const address = await signer.getAddress();

      // Display the Ethereum address
      alert(`Connected with address: ${address}`);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
    campaign.addRequest(
      id,
      50,
      '0x7DeF04705Ee2120B7c9f37AA7853879D49b965dc',
      localStorage.getItem('userId') || 'anonymous',
      'xzcxzc',
    );
  };

  const renderCard = (data: CampainUI) => (
    <Card
      variant='outlined'
      sx={{
        margin: '10px 10px 20px',
        boxShadow: '0 8px 24px hsla(210,8%,62%,.2)',
        borderRadius: '10px',
      }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={data.thumbnail}
      />
      <CardContent>
        <Typography
          sx={{
            background: '#f4f4f4',
            padding: '3px 15px',
            position: 'absolute',
            borderRadius: '12px',
            top: '10px',
            margin: '5px 0 0 5px',
          }}
          fontSize={'13px'}
        >
          Còn {calculateDayCountDown(data.endDate)} ngày
        </Typography>

        <Typography
          sx={{
            fontSize: '20px',
            lineHeight: '22px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            textAlign: 'start',
            fontWeight: 'bold',
          }}
        >
          <Link to={`/campaign/donate/${data.id}`}>{data.title}</Link>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginTop: '10px' }}>
          <Typography
            fontSize={16}
            variant='body2'
            color='text.secondary'
          >
            Tạo bởi
          </Typography>
          <Typography
            fontSize={14}
            color='#f54a00'
            fontWeight='bold'
          >
            {data.creatorId}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            marginTop: '30px',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography
              fontSize={16}
              color='#f54a00'
              fontWeight='bold'
            >
              {data.targetValue?.toLocaleString()} VNĐ
            </Typography>
            <Typography
              variant='body2'
              fontSize={16}
              color='text.secondary'
            >
              đã đạt được
            </Typography>
          </Box>

          <Typography fontSize={16}>{calculatePercent(data.targetValue, 10000000000)}%</Typography>
        </Box>
        <ProgressCustom
          variant='determinate'
          value={calculatePercent(data.targetValue, 10000000000)}
          sx={{ height: '10px', borderRadius: '10px', marginTop: '10px' }}
        />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            marginTop: '10px',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant='body2'
            color='text.secondary'
            fontSize={16}
          >
            của mục tiêu {data.targetValue.toLocaleString()} VNĐ
          </Typography>

          <Typography fontSize={16}>953 người ủng hộ</Typography>
        </Box>
      </CardContent>
      <CardActions>
        {data.status === 'DRAFT' ? (
          <LinkCustom to={`/campaign/edit/${data.id}`}>Chỉnh sửa</LinkCustom>
        ) : (
          <>
            <Button onClick={() => withDraw(data.id)}>Rút tiền</Button>
            <Button
              onClick={() => {
                setTransfer({
                  id: data.id,
                  message: '',
                  number: 0,
                });
              }}
            >
              Tất toán
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );

  return (
    <React.Fragment>
      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
          }}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Nhập số tiền muốn ủng hộ'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <TextField
                type='number'
                onChange={(e) => {
                  setTransfer({ ...transfer, number: parseInt(e.target.value) });
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonConfirm
              onClick={() => {
                campaign.addRequest(
                  transfer.id,
                  transfer.number,
                  '0x7DeF04705Ee2120B7c9f37AA7853879D49b965dc',
                  localStorage.getItem('userId') || 'anonymous',
                  transfer.message,
                );
                setOpenDialog(false);
              }}
            >
              Chuyển
            </ButtonConfirm>
            <ButtonCancel
              onClick={() => {
                setOpenDialog(false);
              }}
              autoFocus
            >
              Đóng
            </ButtonCancel>
          </DialogActions>
        </Dialog>
      )}
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: 'center',
          }}
        >
          <TypographyTitle>Chiến dịch nổi bật</TypographyTitle>
          <Grid
            container
            justifyContent={'center'}
            spacing={3}
            padding={'30px'}
          >
            <Grid
              item
              xs={2}
            >
              <TextField
                id='standard-select-currency'
                label='Tỉnh/TP'
                select
                fullWidth
                name='provinceId'
                onChange={handleChange}
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
              xs={2}
            >
              <TextField
                id='standard-select-currency'
                label='Danh mục'
                select
                name='categoryId'
                onChange={handleChange}
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
              xs={2}
            >
              <TextField
                id='standard-select-currency'
                label='Trạng thái'
                select
                name='status'
                onChange={handleChange}
                fullWidth
                variant='standard'
              >
                {[
                  { id: 'FINISH', value: 'Kết thúc' },
                  { id: 'PENDING', value: 'Đang thực hiện' },
                  { id: 'TARGET', value: 'Đã mục tiêu' },
                  { id: 'TARGET', value: 'Đợi duyệt' },
                ].map((option) => (
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
              xs={6}
            >
              <TextField
                id='standard-select-currency'
                label='Search ...'
                name='search_text'
                inputRef={refInput}
                onKeyUp={(e) => {
                  if (e.code === 'Enter') {
                    setSearchConfig({
                      ...searchConfig,
                      search_text: refInput.current?.value || '',
                      page: 1,
                    });
                  }
                }}
                fullWidth
                variant='standard'
                sx={{
                  width: '50%',
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchTwoTone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {campainList.map((item: any) => (
          <Grid
            item
            xs={4}
          >
            {renderCard(item)}
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <ButtonStyle1
            onClick={handleGetMoreItem}
            sx={{
              marginBottom: '20px',
            }}
          >
            Xem thêm
          </ButtonStyle1>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default CampaignTable;

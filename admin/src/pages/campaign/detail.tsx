import PanelDetail from '@common/Panel';

import { CampainUI } from '@models/campain';

import { Avatar, Box, Button, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import serviceAPI from '@services/api';
import campaign from '@services/ethers/campaign';

import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
interface DetailCampaignProps {
  data: CampainUI;
  openDetail: boolean;
  onClose: () => void;
  loadTable: () => void;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DetailCampaign = (props: DetailCampaignProps) => {
  const { data, openDetail, onClose, loadTable } = props;
  const [detail, setDetail] = useState<CampainUI>(data);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const dispatch = useAppDispatch();
  const handleChangeData = (e: any) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const onApprove = async () => {
    try {
      const response = await serviceAPI.campain.updateStatus(detail.id, 'START');
      if (response.status === 200) {
        const check = await campaign.addNew(detail);
        if (check) {
          dispatch(setInfoAlert({ title: 'Tạo banner thành công!', open: true, type: 'success' }));
        }
        onClose();
        loadTable();
      } else {
        dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
    }
  };
  const onReject = async () => {
    try {
      const response = await serviceAPI.campain.updateStatus(detail.id, 'REJECTED');
      if (response.status === 200) {
        dispatch(setInfoAlert({ title: 'Cập nhật thành công!', open: true, type: 'success' }));
        onClose();
        loadTable();
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Hệ thống lỗi!', open: true, type: 'error' }));
    }
  };
  return (
    <>
      <PanelDetail
        title={'Chi tiết chiến dịch'}
        buttonChildren={
          <Grid
            container
            justifyContent={'space-between'}
          >
            <Grid item>
              <Button onClick={onClose}>Đóng</Button>
            </Grid>
            <Grid item>
              <Button onClick={onReject}>Từ chối</Button>
              {detail.status === 'DRAFT' && <Button onClick={onApprove}>Duyệt</Button>}
            </Grid>
          </Grid>
        }
        open={openDetail}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab
                label='Thông tin chi tiết'
                {...a11yProps(0)}
              />
              <Tab
                label='File xác thực'
                {...a11yProps(1)}
              />
              <Tab
                label='Biểu đồ'
                {...a11yProps(2)}
              />
              <Tab
                label='Lịch sử giao dịch'
                {...a11yProps(4)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel
            value={value}
            index={0}
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
                  onChange={handleChangeData}
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
                  onChange={handleChangeData}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  value={detail.creatorId}
                  label='Người tạo'
                  fullWidth
                  name='description'
                  size='small'
                  onChange={handleChangeData}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  value={detail.categoryId}
                  label='Danh mục'
                  fullWidth
                  name='description'
                  size='small'
                  onChange={handleChangeData}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  value={detail.endDate.toString()}
                  label='Ngày kết thúc'
                  fullWidth
                  name='description'
                  size='small'
                  onChange={handleChangeData}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  value={detail.targetValue}
                  label='Mục tiêu'
                  fullWidth
                  size='small'
                  onChange={handleChangeData}
                />
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            index={1}
          >
            <object
              data={data.fileUrl}
              style={{
                width: '100%',
                height: '60vh',
              }}
              type='application/pdf'
            />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            index={2}
          >
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </CustomTabPanel>
        </Box>
      </PanelDetail>
    </>
  );
};
export default DetailCampaign;

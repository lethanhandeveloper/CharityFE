import PanelDetail from '@common/Panel';

import { CampainUI } from '@models/campain';

import { Avatar, Box, Button, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import serviceAPI from '@services/api';
import campaign from '@services/ethers/campaign';

import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import React, { useState } from 'react';
import TableRender from '@components/Table/tableCapaign';
import ConfirmDialog from '@components/ConfirmDialog';
import TableRenderHistoryItem from '@components/Table/tableItem';
import OppositeContentTimeline from '@components/TimeLine';
import TypographyLabel from '@components/Typography';
import { BoxRow } from '@common/Box';
import MonthlyBarChart from '@components/Chart';
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
        <Box sx={{ p: 3, padding: 0 }}>
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
          dispatch(
            setInfoAlert({ title: 'Duyệt chiến dịch thành công!', open: true, type: 'success' }),
          );
        }
        onClose();
        loadTable();
      } else {
        dispatch(setInfoAlert({ title: 'Duyệt chuyến dịch thất bại!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể duyệt chiến dịch!', open: true, type: 'error' }));
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
  const onCancel = async () => {
    try {
      const response = await serviceAPI.campain.updateStatus(detail.id, 'CANCEL');
      if (response.status === 200) {
        campaign.refund(detail.id);
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
            gap={3}
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
            <Grid
              item
              gap={3}
            >
              {detail.status === 'START' && (
                <ConfirmDialog
                  buttonText='Hoàn tiền'
                  message='Xác nhận chiến dịch vi phạm tiêu chuẩn/thông tin không đúng thực tế'
                  title='Xác nhận hủy chuyển dịch'
                  onSucess={onCancel}
                />
              )}

              {detail.status === 'DRAFT' && (
                <BoxRow sx={{ gap: 2 }}>
                  <ConfirmDialog
                    buttonText='Từ chối'
                    message='Xác nhận đóng chiến dịch'
                    onSucess={onReject}
                    title='Xác nhận hủy chiến dịch'
                  />
                  <ConfirmDialog
                    buttonText='Duyệt'
                    message='Xác nhận bắt bầu chiến dịch'
                    onSucess={onApprove}
                    title='Xác nhận duyệt chiến dịch'
                  />
                </BoxRow>
              )}
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
              {detail.id && (
                <Tab
                  label='Lịch sử rút'
                  {...a11yProps(2)}
                />
              )}
              {detail.id && (
                <Tab
                  label='Lịch sử quyên góp'
                  {...a11yProps(3)}
                />
              )}
              {detail.id && (
                <Tab
                  label='Vật phẩm quyên góp'
                  {...a11yProps(4)}
                />
              )}
            </Tabs>
          </Box>
          <CustomTabPanel
            value={value}
            index={0}
          >
            <Grid
              container
              spacing={1}
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
                    variant='square'
                    src={detail.thumbnail}
                    sx={{ width: 550, height: 200, borderRadius: '5px', marginTop: '10px' }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TypographyLabel>Tiêu đề</TypographyLabel>
                <TextField
                  value={detail.title}
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
                <TypographyLabel>Mô tả</TypographyLabel>
                <TextField
                  value={detail.description}
                  fullWidth
                  name='description'
                  size='small'
                  onChange={handleChangeData}
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <TypographyLabel>Người tạo</TypographyLabel>
                <TextField
                  value={detail.creatorId}
                  fullWidth
                  name='creatorId'
                  size='small'
                  onChange={handleChangeData}
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <TypographyLabel>Danh mục</TypographyLabel>
                <TextField
                  value={detail.categoryId}
                  fullWidth
                  name='categoryId'
                  size='small'
                  onChange={handleChangeData}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TypographyLabel>Ngày kết thúc</TypographyLabel>
                <TextField
                  value={detail.endDate.toString()}
                  fullWidth
                  name='endDate'
                  size='small'
                  onChange={handleChangeData}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TypographyLabel>Mục tiêu</TypographyLabel>
                <TextField
                  value={detail.targetValue}
                  name='targetValue'
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
            <OppositeContentTimeline campaignId={detail.id} />
            <MonthlyBarChart
              endDate={new Date()}
              startDate={new Date('2023-12-29')}
              isLine={false}
              type='Campaign'
              id={detail.id}
            />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            index={3}
          >
            <TableRender
              id={detail.id}
              isCampaign={true}
            />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            index={4}
          >
            <TableRenderHistoryItem
              id={detail.id}
              isCampaign={true}
            />
          </CustomTabPanel>
        </Box>
      </PanelDetail>
    </>
  );
};
export default DetailCampaign;

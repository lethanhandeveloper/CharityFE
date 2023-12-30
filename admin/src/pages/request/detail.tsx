import PanelDetail from '@common/Panel';
import { RequestUI } from '@models/request';

import { Box, Button, Grid, Tab, Tabs } from '@mui/material';
import { CustomTabPanel, a11yProps } from '@pages/campaign/detail';
import serviceAPI from '@services/api';

import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import React from 'react';
import PersonalTab from './component/personal';
import CommitTab from './component/commit';
import ConfirmDialog from '@components/ConfirmDialog';

interface DetailRequestProps {
  data: RequestUI;
  openDetail: boolean;
  onClose: () => void;
  loadTable: () => void;
}
const DetailRequest = (props: DetailRequestProps) => {
  const { data, openDetail, onClose, loadTable } = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const dispatch = useAppDispatch();

  const onSave = async () => {
    try {
      const response = await serviceAPI.auth.updateRequest(data.id, 2);
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
        title={'Chi tiết quyền'}
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
              <ConfirmDialog
                buttonText='Duyệt'
                message='Duyệt đơn đăng ký'
                title='Xác nhận duyệt đơn đăng ký'
                onSucess={onSave}
              />
              <ConfirmDialog
                buttonText='Từ chối'
                message='Xác nhận từ chối đơn đăng ký'
                title='Xác nhận từ chối'
                onSucess={onSave}
              />
            </Grid>
          </Grid>
        }
        open={openDetail}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab
              label='Thông tin đăng ký'
              {...a11yProps(0)}
            />
            <Tab
              label='Thông tin cam kết'
              {...a11yProps(1)}
            />
            <Tab
              label='File xác thực'
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>

        <CustomTabPanel
          value={value}
          index={0}
        >
          <PersonalTab data={data.personalGeneralInfoUI} />
        </CustomTabPanel>

        <CustomTabPanel
          value={value}
          index={1}
        >
          <CommitTab data={data.commitInfoVerificationUI} />
        </CustomTabPanel>
        <CustomTabPanel
          value={value}
          index={2}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <object
              data={data.personalGeneralInfoUI.achivementDoc}
              style={{
                width: '100%',
                height: '60vh',
                scrollbarWidth: 'auto',
              }}
              type='application/pdf'
            />
          </Box>
        </CustomTabPanel>
      </PanelDetail>
    </>
  );
};
export default DetailRequest;

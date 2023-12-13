import TableRender from '@components/Table/tableCapaign';
import { UserUI } from '@models/user';
import { Avatar, Box, Grid, Tab, Tabs, TextField } from '@mui/material';
import { a11yProps, CustomTabPanel } from '@pages/campaign/detail';
import { useState } from 'react';
interface DetailUserProps {
  data: UserUI;
  setData: (data: UserUI) => void;
}
const DetailUser = (props: DetailUserProps) => {
  const { data } = props;
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
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
            label='Lịch sử giao dịch'
            {...a11yProps(1)}
          />
          <Tab
            label='Biểu đồ'
            {...a11yProps(2)}
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
            <Avatar
              src={data.imageUrl}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              value={data.fullname}
              label='Họ và tên'
              fullWidth
              size='small'
              disabled
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              value={data.age}
              label='Tuổi'
              fullWidth
              size='small'
              disabled
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              value={data.email}
              label='Email'
              fullWidth
              size='small'
              disabled
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              value={data.phoneNumber}
              label='Số điện thoại'
              fullWidth
              size='small'
              disabled
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              value={data.userName}
              label='User name'
              fullWidth
              size='small'
              disabled
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              value={data.gender}
              label='Giới tính'
              fullWidth
              size='small'
              disabled
            />
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={1}
      >
        <TableRender
          isCampaign={false}
          id={data.id}
        />
      </CustomTabPanel>
    </>
  );
};
export default DetailUser;

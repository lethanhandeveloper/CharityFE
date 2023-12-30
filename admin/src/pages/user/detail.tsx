import TableRender from '@components/Table/tableCapaign';
import TypographyLabel from '@components/Typography';
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
          rowGap={1}
          columnSpacing={2}
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
              variant='rounded'
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TypographyLabel>Họ và tên</TypographyLabel>
            <TextField
              value={data.fullname}
              fullWidth
              size='small'
              contentEditable={false}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TypographyLabel>Tuổi</TypographyLabel>
            <TextField
              value={data.age}
              fullWidth
              size='small'
              contentEditable={false}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TypographyLabel>Email</TypographyLabel>
            <TextField
              value={data.email}
              fullWidth
              size='small'
              contentEditable={false}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TypographyLabel>Số điện thoại</TypographyLabel>
            <TextField
              value={data.phoneNumber}
              fullWidth
              size='small'
              contentEditable={false}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TypographyLabel>Nickname</TypographyLabel>
            <TextField
              value={data.userName}
              fullWidth
              size='small'
              contentEditable={false}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TypographyLabel>Giới tính</TypographyLabel>
            <TextField
              value={data.gender}
              fullWidth
              size='small'
              contentEditable={false}
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

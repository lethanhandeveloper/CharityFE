import TypographyTitle from '@common/Typography';
import { UserUI } from '@models/user';
import {
  Card,
  Typography,
  Button,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Box,
} from '@mui/material';
import { FC } from 'react';
interface AccountSectionProps {
  list: UserUI[];
}
const AccountSection: FC<AccountSectionProps> = (props) => {
  const renderCardAccount = (account: UserUI) => (
    <Card style={{ textAlign: 'left' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={account.imageUrl}
            style={{ width: '48px', height: '48px' }}
          />
          <div>
            <Typography
              sx={{ fontSize: 14, fontWeight: 'bold' }}
              // color='text.secondary'
              gutterBottom
            >
              {account.fullname}
            </Typography>
            <Typography sx={{ fontSize: 13 }}>{account.userName}</Typography>
          </div>
        </Box>
        <Divider
          variant='middle'
          style={{ background: '#f54a00' }}
        />

        <Typography>Tài khoản thiện nguyện số: {account.email}</Typography>
        <Typography>Số tiền gây quĩ:{0}</Typography>
        <Typography>Tham gia từ: {new Date().toString()}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Xem chi tiết</Button>
      </CardActions>
    </Card>
  );
  return (
    <Grid
      container
      justifyItems='center'
      sx={{
        background: '#fecb98',
        padding: '0 20px 30px 20px',
      }}
      spacing={3}
    >
      <Grid
        item
        xs={12}
        textAlign='center'
      >
        <TypographyTitle>Tin dùng bởi 900+ tổ chức và cá nhân thiện nguyện</TypographyTitle>
      </Grid>

      {props.list?.map((item) => (
        <Grid
          item
          xs={4}
        >
          {renderCardAccount(item)}
        </Grid>
      ))}
    </Grid>
  );
};
export default AccountSection;

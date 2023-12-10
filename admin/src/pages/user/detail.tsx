import { UserUI } from '@models/user';
import { Avatar, Grid, TextField } from '@mui/material';

interface DetailUserProps {
  data: UserUI;
  setData: (data: UserUI) => void;
}
const DetailUser = (props: DetailUserProps) => {
  const { data } = props;
  return (
    <>
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
    </>
  );
};
export default DetailUser;

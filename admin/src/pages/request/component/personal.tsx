import TypographyLabel from '@components/Typography';
import { PersonalGeneralInfoUI } from '@models/request';
import { Grid, TextField } from '@mui/material';

const PersonalTab = ({ data }: { data: PersonalGeneralInfoUI }) => {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <TypographyLabel>Tên người đại diện</TypographyLabel>
        <TextField
          value={data.name}
          fullWidth
          name='name'
          size='small'
          contentEditable={false}
        />
      </Grid>
      <Grid
        item
        xs={6}
      >
        <TypographyLabel>Email người đại diện</TypographyLabel>
        <TextField
          value={data.email}
          fullWidth
          name='name'
          size='small'
          contentEditable={false}
        />
      </Grid>
      <Grid
        item
        xs={6}
      >
        <TypographyLabel>Ngày thành lập</TypographyLabel>
        <TextField
          value={data.email}
          fullWidth
          name='name'
          size='small'
          contentEditable={false}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TypographyLabel>Địa chỉ</TypographyLabel>
        <TextField
          value={data.address}
          contentEditable={false}
          fullWidth
          name='name'
          size='small'
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TypographyLabel>Số điện thoại</TypographyLabel>
        <TextField
          value={data.phoneNumber}
          contentEditable={false}
          fullWidth
          name='name'
          size='small'
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TypographyLabel>Mạng xã hội URL</TypographyLabel>
        <TextField
          value={data.actionDescSociaLink}
          contentEditable={false}
          fullWidth
          name='name'
          size='small'
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TypographyLabel>Tên nhóm/tổ chức</TypographyLabel>
        <TextField
          value={data.clubName}
          contentEditable={false}
          fullWidth
          name='name'
          size='small'
        />
      </Grid>
    </Grid>
  );
};
export default PersonalTab;

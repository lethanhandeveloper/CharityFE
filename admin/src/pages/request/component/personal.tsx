import { PersonalGeneralInfoUI } from '@models/request';
import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const PersonalTab = ({ data }: { data: PersonalGeneralInfoUI }) => {
  return (
    <Grid
      container
      gap={3}
    >
      <Grid
        item
        xs={12}
      >
        <TextField
          value={data.name}
          label='Tên'
          fullWidth
          name='name'
          size='small'
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
          name='name'
          size='small'
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <DatePicker
          sx={{ width: 260 }}
          label={'Ngày sinh'}
          value={new Date()}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          value={data.address}
          label='Địa chỉ'
          fullWidth
          name='name'
          size='small'
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
          name='name'
          size='small'
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          value={data.actionDescSociaLink}
          label='Mạng xã hội'
          fullWidth
          name='name'
          size='small'
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          value={data.clubName}
          label='Tên nhóm'
          fullWidth
          name='name'
          size='small'
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <object
          data={data.achivementDoc}
          style={{
            width: '100%',
            height: '30vh',
          }}
          type='application/pdf'
        />
      </Grid>
    </Grid>
  );
};
export default PersonalTab;

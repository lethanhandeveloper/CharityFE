import { CommitInfoVerificationUI } from '@models/request';
import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const CommitTab = ({ data }: { data: CommitInfoVerificationUI }) => {
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
          value={data.goalName}
          label='Slogan'
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
          label='Start'
          sx={{ width: 260 }}
          value={new Date()}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <DatePicker
          label='End'
          sx={{ width: 260 }}
          value={new Date()}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          value={data.targetAmount}
          label='Mục tiêu'
          fullWidth
          name='name'
          size='small'
        />
      </Grid>
    </Grid>
  );
};
export default CommitTab;

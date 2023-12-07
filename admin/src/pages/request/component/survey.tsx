import { SurveyInfoVerificationUI } from '@models/request';
import { Grid, TextField } from '@mui/material';

const SurveyTab = ({ data }: { data: SurveyInfoVerificationUI }) => {
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
          value={data.chanel}
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
          value={data.lawFiveOption}
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
          value={data.lawFourOption}
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
          value={data.lawThreeOption}
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
          value={data.lawTwoOption}
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
          value={data.lawOneOption}
          label='Mạng xã hội'
          fullWidth
          name='name'
          size='small'
        />
      </Grid>
    </Grid>
  );
};
export default SurveyTab;

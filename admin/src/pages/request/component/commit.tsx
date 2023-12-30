import TypographyLabel from '@components/Typography';
import { CommitInfoVerificationUI } from '@models/request';
import { Grid, TextField } from '@mui/material';

const CommitTab = ({ data }: { data: CommitInfoVerificationUI }) => {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <TypographyLabel>Slogan</TypographyLabel>
        <TextField
          value={data.goalName}
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
        <TypographyLabel>Dự kiến bắt dầu</TypographyLabel>
        <TextField
          value={data.goalName}
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
        <TypographyLabel>Dự kiến kết thúc</TypographyLabel>
        <TextField
          value={data.goalName}
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
        <TypographyLabel>Mục tiêu của nhóm/tổ chức</TypographyLabel>
        <TextField
          value={data.targetAmount}
          contentEditable={false}
          fullWidth
          name='name'
          size='small'
        />
      </Grid>
    </Grid>
  );
};
export default CommitTab;

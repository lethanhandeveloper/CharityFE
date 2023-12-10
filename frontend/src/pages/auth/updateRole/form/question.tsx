import { Grid, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
interface QuestionFormProps {
  setData: (data: any) => void;
  data: any;
}

const QuestionForm = (props: QuestionFormProps) => {
  const { data, setData } = props;

  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Grid
        container
        sx={{
          padding: '0 60px 0',
        }}
      >
        <Grid
          item
          xs={12}
        >
          <Typography>Số tiền gây quỹ:</Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            value={data?.targetAmount}
            name='targetAmount'
            type='number'
            variant='standard'
          />
          <Typography>Mục đích:</Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            value={data?.goalName}
            name='goalName'
            variant='standard'
          />
          <Typography>Dự định thực hiện:</Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            name='planDesc'
            value={data?.planDesc}
            variant='standard'
          />

          <Typography>Ngày bắt đầu:</Typography>

          <DatePicker
            label='Controlled picker'
            value={new Date(data?.startDate)}
            onChange={(newValue) => {
              setData({ ...data, startDate: newValue });
            }}
          />

          <Typography>Ngày kết thúc:</Typography>
          <DatePicker
            label='Controlled picker'
            value={new Date(data?.endDate)}
            onChange={(newValue) => {
              setData({ ...data, endDate: newValue });
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default QuestionForm;

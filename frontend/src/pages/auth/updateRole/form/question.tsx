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
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Số tiền gây quỹ:
          </Typography>
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
          <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
            Mục đích:
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            onChange={handleChange}
            fullWidth
            value={data?.goalName}
            name='goalName'
            variant='standard'
          />
          <Grid container>
            <Grid
              item
              xs={6}
            >
              <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
                Ngày bắt đầu:
              </Typography>

              <DatePicker
                value={new Date(data?.startDate)}
                onChange={(newValue) => {
                  setData({ ...data, startDate: newValue });
                }}
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <Typography style={{ fontWeight: 'bold', marginTop: '10px', marginBottom: '5px' }}>
                Ngày kết thúc:
              </Typography>
              <DatePicker
                value={new Date(data?.endDate)}
                onChange={(newValue) => {
                  setData({ ...data, endDate: newValue });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default QuestionForm;

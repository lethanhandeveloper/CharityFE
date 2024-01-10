import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OrginazationForm from './form/orginazation';
import { Grid } from '@mui/material';
import Upload from '@services/firebase';
import CommonForm from './form/common';
import PersonalForm from './form/personal';
import serviceAPI from '@services/api';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import QuestionForm from './form/question';
import { useParams } from 'react-router';

const steps = ['Thông tin cơ bản', 'Thông tin tổ chức', 'Cam kết', 'Cập nhật file xác thực'];

const UpdateRolePage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { id } = useParams();
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [data, setData] = React.useState<any>({ type: 2 });
  const [question, setQuestion] = React.useState<any>();
  const dispatch = useAppDispatch();
  const isStepOptional = (step: number) => {
    return step === 1;
  };
  React.useEffect(() => {
    const initData = async () => {
      const response = await serviceAPI.auth.getRequest(id || '');
      if (response.data.result.type === 1) {
        setData({
          ...response.data.result.personalGeneralInfo,
          type: response.data.result.type,
        });
      } else {
        setData({
          ...response.data.result.organizationGeneralInfo,
          type: response.data.result.type,
        });
      }

      setQuestion(response.data.result.commitInfoVerification);
    };
    if (id) initData();
  }, []);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    try {
      let response;

      if (data.type == 2) {
        if (id) {
          response = await serviceAPI.auth.updateRequest(
            {
              type: data.type,
              commitInfoVerification: {
                ...question,
              },
              organizationGeneralInfo: {
                ...data,
              },
            },
            id,
          );
        } else {
          response = await serviceAPI.auth.submitRequest({
            type: data.type,
            commitInfoVerification: {
              ...question,
            },
            organizationGeneralInfo: {
              ...data,
            },
          });
        }
      } else {
        if (id) {
          response = await serviceAPI.auth.updateRequest(
            {
              type: data.type,
              commitInfoVerification: {
                ...question,
              },
              personalGeneralInfo: {
                ...data,
              },
            },
            id,
          );
        } else {
          response = await serviceAPI.auth.submitRequest({
            type: data.type,
            commitInfoVerification: {
              ...question,
            },
            personalGeneralInfo: {
              ...data,
            },
          });
        }
      }
      dispatch(setInfoAlert({ open: true, title: response.data.result.message, type: 'success' }));
    } catch (error) {
      dispatch(setInfoAlert({ open: true, title: 'Không thể gửi yêu câu', type: 'error' }));
    }
  };

  return (
    <Grid
      container
      sx={{ padding: '20px 100px 20px 100px ' }}
    >
      <Box
        sx={{
          width: '100%',

          backgroundColor: 'white',
          borderRadius: '5px',
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant='caption'>Optional</Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step
                key={label}
                {...stepProps}
              >
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length - 1 ? (
          <Grid container>
            <Typography>File xác thực</Typography>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
              }}
            >
              <object
                data={data?.achivementDoc}
                style={{
                  width: '100%',
                  height: '30vh',
                }}
                type='application/pdf'
              />
              <Upload
                className='pdf'
                setUrl={(url: string) => {
                  setData({ ...data, achivementDoc: url });
                }}
                type='application/pdf'
                folder='file'
              />
            </Box>
          </Grid>
        ) : (
          <React.Fragment>
            {activeStep === 0 ? (
              <CommonForm
                data={data}
                setData={setData}
              />
            ) : activeStep === 1 ? (
              <>
                {data?.type == '1' ? (
                  <PersonalForm
                    data={data}
                    setData={setData}
                  />
                ) : (
                  <OrginazationForm
                    data={data}
                    setData={setData}
                  />
                )}
              </>
            ) : (
              <>
                <QuestionForm
                  data={question}
                  setData={setQuestion}
                />
              </>
            )}
          </React.Fragment>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 2,
            padding: '20px',
          }}
        >
          {activeStep !== 0 && (
            <Button
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant='outlined'
            >
              Quay lại
            </Button>
          )}

          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>Gửi yêu cầu</Button>
          ) : (
            <Button
              onClick={handleNext}
              variant='contained'
            >
              Tiếp theo
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  );
};
export default UpdateRolePage;

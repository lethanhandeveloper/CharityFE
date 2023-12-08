import { Facebook, LinkedIn, YouTube } from '@mui/icons-material';
import { Avatar, Grid, Typography } from '@mui/material';
import MonthlyBarChart from './bar';
import { OrganizationUI } from '@models/user';
import { useParams } from 'react-router';
import CampaignTable from './campaignTable';

const DetailAccount = () => {
  const { id } = useParams();
  const data: OrganizationUI = {
    achivementDoc: '',
    actionDescSocialLink: '',
    address: '',
    description: '',
    establishedDate: new Date(),
    name: '',
    operationField: '',
    representativeEmail: '',
    representativeName: '',
    representativePhoneNumber: '',
    website: '',
  };

  return (
    <Grid container>
      <Grid
        item
        xs={4}
      >
        <Avatar src={data?.actionDescSocialLink} />
      </Grid>
      <Grid
        item
        xs={8}
      >
        <Typography>{data?.name}</Typography>
        <Typography>{data?.address}</Typography>
        <Typography>{data?.description}</Typography>
        <Facebook />
        <YouTube />
        <LinkedIn />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <MonthlyBarChart />
      </Grid>
      <Grid
        item
        xs={12}
      >
        {id && <CampaignTable id={id} />}
      </Grid>
    </Grid>
  );
};
export default DetailAccount;

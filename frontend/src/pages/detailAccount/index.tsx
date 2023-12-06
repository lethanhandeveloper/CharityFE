import { OrganizationUI } from '@models/user';
import { Facebook, LinkedIn, YouTube } from '@mui/icons-material';
import { Avatar, Grid, Typography } from '@mui/material';
interface DetailAccountProps {
  data: OrganizationUI;
}
const DetailAccount = (props: DetailAccountProps) => {
  const { data } = props;
  return (
    <Grid container>
      <Grid
        item
        xs={4}
      >
        <Avatar src={data.actionDescSocialLink} />
      </Grid>
      <Grid
        item
        xs={8}
      >
        <Typography>{data.name}</Typography>
        <Typography>{data.address}</Typography>
        <Typography>{data.description}</Typography>
        <Facebook />
        <YouTube />
        <LinkedIn />
      </Grid>
    </Grid>
  );
};
export default DetailAccount;

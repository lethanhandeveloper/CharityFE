import { OrganizationUI } from '@models/orginazation';
import { Grid, TextField } from '@mui/material';

interface OrganizationPanelProps {
  data: OrganizationUI;
}
const OrganizationPanel = (props: OrganizationPanelProps) => {
  const { data } = props;
  return (
    <Grid container>
      <Grid
        item
        xs={12}
      >
        <TextField
          value={data.name}
          label={'Tên tổ chức'}
        />
        <TextField
          value={data.address}
          label={'Địa chỉ'}
        />
        <TextField
          value={data.description}
          label={'Slogan'}
        />
        <TextField
          value={data.website}
          label={'Website'}
        />
        <TextField
          value={data.actionDescSocialLink}
          label={'Mạng'}
        />
        <TextField
          value={data.operationField}
          label={'Lĩnh vực hoạt động'}
        />
        <object
          data={data.achivementDoc}
          style={{
            width: '100%',
            height: '70vh',
          }}
          type='application/pdf'
        />
      </Grid>
    </Grid>
  );
};
export default OrganizationPanel;

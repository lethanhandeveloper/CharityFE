import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Avatar, Box, TextField, Typography } from '@mui/material';
import serviceAPI from '@services/api';
import { setInfoAlert } from '@store/redux/alert';
import { useAppDispatch } from '@store/hook';
import { CampainUI } from '@models/campain';
import { mapCampainUIs } from '@services/mapdata/campain';

interface DialogChooseCampaignProps {
  lat: number;
  long: number;
  campaignId?: string;
}
export default function DialogChooseCampaign(props: DialogChooseCampaignProps) {
  const [open, setOpen] = React.useState(false);
  const [campaignList, setCampaignList] = React.useState<CampainUI[]>([]);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    const initData = async () => {
      const response = await serviceAPI.campain.getCampaignList();
      setCampaignList(mapCampainUIs(response.data.result));
    };
    initData();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const create = async () => {
    try {
      const response = await serviceAPI.map.create({ lat: props.lat });
      if (response.status === 200) {
        dispatch(setInfoAlert({ title: 'Tạo banner thành công!', open: true, type: 'success' }));
      } else {
        dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
    }
  };
  const update = async () => {
    try {
      const response = await serviceAPI.map.update({});
      if (response.status === 200) {
        dispatch(setInfoAlert({ title: 'Tạo banner thành công!', open: true, type: 'success' }));
      } else {
        dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
      }
    } catch (error) {
      dispatch(setInfoAlert({ title: 'Không thể tạo banner!', open: true, type: 'error' }));
    }
  };

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        onClick={handleClickOpen}
      >
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Select campaign'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Autocomplete
              id='country-select-demo'
              sx={{ width: 300 }}
              options={campaignList}
              autoHighlight
              getOptionLabel={(option) => option.id}
              renderOption={(props, option) => (
                <Box
                  component='li'
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <Avatar src={option.thumbnail} />
                  <Typography>{option.title}</Typography>
                  <Typography>{option.endDate.toString()}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Choose a campaign'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={create}
            autoFocus
          >
            Agree
          </Button>
          <Button
            onClick={update}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

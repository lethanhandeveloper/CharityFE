import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      direction='left'
      ref={ref}
      {...props}
    />
  );
});
interface PanelDetailProps {
  buttonChildren: React.ReactNode;
  open: boolean;
  children?: React.ReactNode;
  title: string;
}
export default function PanelDetail(props: PanelDetailProps) {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        fullScreen
        sx={{
          width: '50%',
          marginLeft: 'auto', // Set marginLeft to 'auto' for right positioning
          marginRight: 0,
        }}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>{props.buttonChildren}</DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

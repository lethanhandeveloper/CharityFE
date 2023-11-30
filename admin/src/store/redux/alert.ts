import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AlertRedux } from '@services/models/meta';
const initialState: AlertRedux = {
  title: '',
  type: 'error',
  open: false,
};
export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setInfoAlert: (state, action: PayloadAction<AlertRedux>) => {
      return { ...action.payload };
    },
  },
});
export const { setInfoAlert } = alertSlice.actions;

export default alertSlice.reducer;

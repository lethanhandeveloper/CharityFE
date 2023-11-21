import { configureStore } from '@reduxjs/toolkit';

import alertReduce from './redux/alert';
const store = configureStore({
  reducer: {
    alert: alertReduce,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

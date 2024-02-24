import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './reducer';

const store = configureStore({
  reducer: todoSlice,
});

export default store;

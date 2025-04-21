// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './scheduleSlice';

const store = configureStore({
  reducer: {
    schedule: scheduleReducer
  },
  devTools: process.env.NODE_ENV !== 'production'  // ✅ Enables Redux DevTools in development
});

export default store;

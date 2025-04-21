// src/redux/scheduleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    events: []
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
    clearEvents: (state) => {
      state.events = [];
    }
  }
});

export const { setEvents, addEvent, deleteEvent, clearEvents } = scheduleSlice.actions;
export default scheduleSlice.reducer;

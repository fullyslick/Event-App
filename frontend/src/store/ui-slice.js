import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    notification: null,
  },
  reducers: {
    setLoader(state, action) {
      state.isLoading = action.payload;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    resetError(state, action) {
      state.notification = {
        status: '',
        title: '',
        message: '',
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

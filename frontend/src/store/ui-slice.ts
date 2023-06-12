import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type notification = {
  status: string;
  title: string;
  message: string;
};

interface uiState {
  isLoading: boolean;
  notification: null | notification;
  isAnimatedCounter: boolean;
}

const initialState: uiState = {
  isLoading: false,
  notification: null,
  isAnimatedCounter: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setLoader(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    showNotification(state, action: PayloadAction<notification>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    resetError(state) {
      state.notification = {
        status: '',
        title: '',
        message: '',
      };
    },
    toggleIsCounter(state, action: PayloadAction<boolean>) {
      state.isAnimatedCounter = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

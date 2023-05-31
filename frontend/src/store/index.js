import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import eventsSlice from './events-slice';

const eventsReducer = eventsSlice.reducer;

const uiSliceReducer = uiSlice.reducer;

const store = configureStore({
  reducer: { ui: uiSliceReducer, events: eventsReducer },
});

export default store;

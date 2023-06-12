import { uiActions } from './ui-slice';
import { eventsActions } from './events-slice';
import { getEvents, getEventDetails } from '../utils/event-api';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

import { event } from '../types';

export const getEventsData = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(uiActions.resetError());
      dispatch(uiActions.setLoader(true));

      const eventsData = await getEvents();

      dispatch(eventsActions.replaceEvents(eventsData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: err.message,
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const getSingleEvent = (eventId: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(uiActions.resetError());
      dispatch(uiActions.setLoader(true));

      const eventData = await getEventDetails(eventId);

      dispatch(eventsActions.appendEvent(eventData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: err.message,
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const addNewEvent = (eventData: event) => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(uiActions.setLoader(true));

    // Used to simulate ajax request and show loader on UI
    setTimeout(() => {
      dispatch(eventsActions.createEvent(eventData));

      dispatch(uiActions.setLoader(false));
    }, 1000);
  };
};

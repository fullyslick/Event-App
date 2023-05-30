import { uiActions } from './ui-slice';
import { eventsActions } from './events-slice';
import { getEvents, getEventDetails } from '../utils/event-api';

export const getEventsData = () => {
  return async (dispatch) => {
    try {
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

export const getSingleEvent = (eventId) => {
  return async (dispatch) => {
    try {
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

export const addNewEvent = (eventData) => {
  return (dispatch) => {
    dispatch(uiActions.setLoader(true));

    // Used to simulate ajax request and show loader on UI
    setTimeout(() => {
      dispatch(eventsActions.createEvent(eventData));

      dispatch(uiActions.setLoader(false));
    }, 1000);
  };
};

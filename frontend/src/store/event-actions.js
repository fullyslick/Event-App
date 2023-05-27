import { uiActions } from "./ui-slice";
import { eventsActions } from "./events-slice";
import { getEvents } from "../utils/event-api";

export const getEventsData = () => {
    return async (dispatch) => {
        try {

            dispatch(uiActions.setLoader(true));

            const eventData = await getEvents();

            dispatch(eventsActions.replaceEvents(eventData));

        } catch (err) {

            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: err.message
            }));

        } finally {
            dispatch(uiActions.setLoader(false));
        }
    }
}

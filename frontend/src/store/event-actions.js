import { uiActions } from "./ui-slice";
import { eventsActions } from "./events-slice";
import DUMMY_DATA from "../dummy-data";

export const getEventsData = () => {
    return async (dispatch) => {

        const delayedFetch = () => {

            return new Promise((resolve) => {
                setTimeout(() => {                    
                    resolve(DUMMY_DATA);
                }, 1000)
            });
        }

        const fetchData = async () => {            
            const response = await delayedFetch();
            //throw new Error('WOW how about now!');
            return response;
        }

        try {
            dispatch(uiActions.setLoader(true));
            const eventData = await fetchData();
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

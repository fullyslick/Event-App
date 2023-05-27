import { uiActions } from "./ui-slice";
import { eventsActions } from "./events-slice";
import DUMMY_DATA from "../dummy-data";

export const getEventsData = () => {
    return async (dispatch) => {

        const fetchData = async () => {            
            //throw new Error('WOW how about now!');
            const response = await Promise.resolve(DUMMY_DATA);   
            
            return response;
        }
        
        try {
           const eventData = await fetchData();           
           dispatch(eventsActions.replaceEvents(eventData));
        } catch (err) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: err.message
              }));
        }
    }
}

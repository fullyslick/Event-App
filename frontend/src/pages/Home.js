import EventsList from "../components/Events/EventList";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getEventsData } from '../store/event-actions';
import Notification from "../components/UI/Notification";
import ContentWrapper from "../components/Layout/ContentWrapper";
import Loader from "../components/UI/Loader";

const Home = () => {
    const events = useSelector(state => state.events.events);
    const notification = useSelector(state => state.ui.notification);
    const isLoading = useSelector(state => state.ui.isLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        // Get events dat from API only if there is no data in Redux
        if(!events.length) {
            dispatch(getEventsData());
        }        
    }, [dispatch]);
   
    return (
        <ContentWrapper title="Events">
            {isLoading ? <Loader /> : <EventsList events={events} />}
            {notification && !isLoading && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        </ContentWrapper>
    );
};

export default Home;
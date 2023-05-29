import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getEventsData } from '../store/event-actions';

import EventsList from "../components/Events/EventList";
import Notification from "../components/UI/Notification";
import ContentWrapper from "../components/Layout/ContentWrapper";
import Loader from "../components/UI/Loader";

const Home = () => {
    const hasEvents = useSelector(state => state.events.areEventsReplaced);
    const events = useSelector(state => state.events.events);
    const notification = useSelector(state => state.ui.notification);
    const isLoading = useSelector(state => state.ui.isLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        // Get events data from API only if there is no data in Redux
        if (!hasEvents) {
            dispatch(getEventsData());
        }
    }, [dispatch, hasEvents]);

    return (
        <ContentWrapper title="Events">
            {isLoading ? <Loader /> : <EventsList events={events} />}
            {notification && !isLoading &&
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message} />}
        </ContentWrapper>
    );
};

export default Home;
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSingleEvent } from '../store/event-actions';

import ContentWrapper from "../components/Layout/ContentWrapper";
import EventTile from '../components/Events/EventTile';
import Notification from '../components/UI/Notification';
import Loader from '../components/UI/Loader';

const EventDetail = () => {
    const params = useParams();
    const event = useSelector(state => state.events.events.filter((event) => event.id === params.eventId))[0];
    const notification = useSelector(state => state.ui.notification);
    const isLoading = useSelector(state => state.ui.isLoading);

    const dispatch = useDispatch();

    // Call API to get data about this event only if the entry do not exist in Redux
    useEffect(() => {
        if (!event) {
            dispatch(getSingleEvent(params.eventId));
        }
    }, [event, params.eventId, dispatch]);

    return (
        <div>
            <ContentWrapper title="Event Details">
                {isLoading && <Loader />}
                {event && <EventTile event={event} />}
                {notification && !isLoading && <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message} />                  
                }
            </ContentWrapper>
        </div>
    );
}

export default EventDetail;
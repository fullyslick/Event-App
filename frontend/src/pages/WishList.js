import ContentWrapper from "../components/Layout/ContentWrapper";
import EventsList from "../components/Events/EventList";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getEventsData } from '../store/event-actions';
import Notification from "../components/UI/Notification";
import Loader from "../components/UI/Loader";
import WishListTotals from "../components/WishList/WishListTotals";

const WishList = () => {
    const events = useSelector(state => state.events.events.filter(event => event.ticketsWishList));
    const notification = useSelector(state => state.ui.notification);
    const isLoading = useSelector(state => state.ui.isLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        // Get events data from API only if there is no data in Redux
        if (!events.length) {
            dispatch(getEventsData());
        }
    }, [dispatch, events.length]);

    const downloadHandler = () => {
        console.log('Download clicked');
    };

    return (
        <ContentWrapper title="Wish List">
            {isLoading ? <Loader /> :
                <>
                    <div>TO DO SEARCH HERE</div>
                    <WishListTotals />
                    <EventsList events={events} />
                </>
            }
            {notification && !isLoading && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        </ContentWrapper>
    );
}

export default WishList;
import ContentWrapper from '../components/Layout/ContentWrapper';
import EventsList from '../components/Events/EventList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getEventsData } from '../store/event-actions';
import Notification from '../components/UI/Notification';
import Loader from '../components/UI/Loader';
import WishListTotals from '../components/WishList/WishListTotals';
import PdfDownloader from '../components/PdfDownloader/PdfDownloader';
import classes from './WishList.module.css';

const WishList = () => {
  const hasEvents = useSelector((state) => state.events.areEventsReplaced);
  const events = useSelector((state) => state.events.events);
  const wishListEvents = events.filter((event) => event.ticketsWishList);
  const notification = useSelector((state) => state.ui.notification);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    // Get events data from API only if there is no data in Redux
    if (!hasEvents) {
      dispatch(getEventsData());
    }
  }, [dispatch, hasEvents]);

  return (
    <ContentWrapper title='Wish List'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes['wishlist-summary']}>
            <WishListTotals />
            <PdfDownloader events={wishListEvents} />
          </div>
          <EventsList events={wishListEvents} hasRemove hasStepper={false} />
        </>
      )}
      {notification && !isLoading && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </ContentWrapper>
  );
};

export default WishList;

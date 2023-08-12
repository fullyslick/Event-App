import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getEventsData } from '../store/event-actions';
import { selectIsLoading, selectNotification } from '../store/ui-slice';
import { selectEvents, selectAreEventsReplaced } from '../store/events-slice';

import ContentWrapper from '../components/Layout/ContentWrapper';
import EventsList from '../components/Events/EventList';
import Notification from '../components/UI/Notification';
import Loader from '../components/UI/Loader';
import WishListTotals from '../components/WishList/WishListTotals';
import PdfDownloader from '../components/PdfDownloader/PdfDownloader';

import classes from './WishList.module.css';

const WishList = () => {
  const hasEvents = useSelector(selectAreEventsReplaced);
  const events = useSelector(selectEvents);
  const wishListEvents = events.filter((event) => event.ticketsWishList);

  const notification = useSelector(selectNotification);
  const isLoading = useSelector(selectIsLoading);

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

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { eventsActions } from '../../store/events-slice';

import styles from './EventTile.module.css';
import Stepper from '../UI/Stepper';
import Image from '../UI/Image';

import { EventListing } from '../../types';
import React from 'react';

interface EventTileProps {
  event: EventListing;
  hasRemove: Boolean;
  hasStepper: Boolean;
}

const EventTile: React.FC<EventTileProps> = ({
  event,
  hasRemove = false,
  hasStepper = true,
}) => {
  const {
    id,
    title,
    image,
    location,
    date,
    ticketsWishList,
    displayPrice,
    category,
    currency,
    availableTickets,
  } = event;

  const eventDate = date.split('T')[0].split('-').join(' / ');
  let eventTime: string | string[] = date.split('T')[1].split(':');
  eventTime.pop();

  eventTime = eventTime.join(':');

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(eventsActions.removeFromWishList(id));
  };

  return (
    <div className={styles.eventTile}>
      {hasRemove && (
        <button className={styles.eventTileRemove} onClick={handleRemove}>
          ✖
        </button>
      )}
      <Link to={`/event/${id}`} className={styles.eventTileLink}>
        <Image className={styles.eventTileImage} src={image} alt={title} />
      </Link>
      <div className={styles.eventTileDetails}>
        <h2 className={styles.eventTileDetailsTitle}>{title}</h2>
        <p className={styles.eventTileDetailsCategory}>{category}</p>
        <p>
          <span className={styles.eventTileDetailsLabel}>Location:</span>
          {location}
        </p>
        <p>
          <span className={styles.eventTileDetailsLabel}>When:</span>
          {eventDate}
        </p>
        <p>
          <span className={styles.eventTileDetailsLabel}>Starts at:</span>
          {eventTime}
        </p>
        <p>
          <span className={styles.eventTileDetailsLabel}>Price:</span>
          {displayPrice} {currency}
        </p>
      </div>
      <div className={styles.eventTileDetailsActions}>
        <div className={styles.eventTileDetailsActionsAvailability}>
          <p>
            <span
              className={`${styles.eventTileDetailsLabel} ${styles.eventTileDetailsLabelRed}`}
            >
              Tickets left:
            </span>
            {availableTickets}
          </p>
          <p>
            <span
              className={`${styles.eventTileDetailsLabel} ${styles.eventTileDetailsLabelBlue}`}
            >
              Wish list:
            </span>
            {ticketsWishList}
          </p>
        </div>
        {hasStepper && <Stepper eventId={id} />}
      </div>
    </div>
  );
};

export default EventTile;

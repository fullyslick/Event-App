import styles from './Event.module.css';
import Stepper from '../UI/Stepper';
import Image from '../UI/Image';

import { event } from '../../types';
import React from 'react';

interface EventProps {
  event: event;
}

const Event: React.FC<EventProps> = ({ event }) => {
  const {
    id,
    title,
    imageOriginal,
    location,
    date,
    ticketsWishList,
    displayPrice,
    price,
    category,
    currency,
    availableTickets,
    description,
    address,
  } = event;

  const eventDate = date.split('T')[0].split('-').join(' / ');

  let eventTime: string | string[] = date.split('T')[1].split(':');

  eventTime.pop();
  eventTime = eventTime.join(':');

  const totalPrice = (price * ticketsWishList) / 100;

  return (
    <div className={styles.event}>
      <div className={styles.eventImageFrame}>
        <Image className={styles.eventImage} src={imageOriginal} alt={title} />
      </div>
      <div className={styles.eventDetails}>
        <h2 className={styles.eventDetailsTitle}>{title}</h2>
        <p className={styles.eventDetailsCategory}>{category}</p>
        <p>
          <span className={styles.eventDetailsLabel}>About:</span>
          {description}
        </p>
        <p>
          <span className={styles.eventDetailsLabel}>Location:</span>
          {location} {address}
        </p>
        <p>
          <span className={styles.eventDetailsLabel}>When:</span>
          {eventDate}
        </p>
        <p>
          <span className={styles.eventDetailsLabel}>Starts at:</span>
          {eventTime}
        </p>
      </div>
      <div className={styles.eventDetailsActions}>
        <div className={styles.eventDetailsActionsAvailability}>
          <p>
            <span
              className={`${styles.eventDetailsLabel} ${styles.eventDetailsLabelRed}`}
            >
              Tickets left:
            </span>
            {availableTickets}
          </p>
          <p>
            <span
              className={`${styles.eventDetailsLabel} ${styles.eventDetailsLabelBlue}`}
            >
              Wish list:
            </span>
            {ticketsWishList}
          </p>
          <p>
            <span className={styles.eventDetailsLabel}>Price:</span>
            {displayPrice} {currency}
          </p>
          <hr></hr>
          <p>
            <span className={styles.eventDetailsLabel}>Total:</span>
            {totalPrice}
          </p>
        </div>
        <Stepper eventId={id} />
      </div>
    </div>
  );
};

export default Event;

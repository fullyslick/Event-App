import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { eventsActions } from '../../store/events-slice';

import classes from './EventTile.module.css';
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
    <div className={classes['event-tile']}>
      {hasRemove && (
        <button
          className={classes['event-tile--remove']}
          onClick={handleRemove}
        >
          ✖
        </button>
      )}
      <Link to={`/event/${id}`} className={classes['event-tile__link']}>
        <Image
          className={classes['event-tile__image']}
          src={image}
          alt={title}
        />
      </Link>
      <div className={classes['event-tile__details']}>
        <h2 className={classes['event-tile__details-title']}>{title}</h2>
        <p className={classes['event-tile__details-category']}>{category}</p>
        <p>
          <span className={classes['event-tile__details-label']}>
            Location:
          </span>
          {location}
        </p>
        <p>
          <span className={classes['event-tile__details-label']}>When:</span>
          {eventDate}
        </p>
        <p>
          <span className={classes['event-tile__details-label']}>
            Starts at:
          </span>
          {eventTime}
        </p>
        <p>
          <span className={classes['event-tile__details-label']}>Price:</span>
          {displayPrice} {currency}
        </p>
      </div>
      <div className={classes['event-tile__details-actions']}>
        <div className={classes['event-tile__details-actions--availability']}>
          <p>
            <span
              className={`${classes['event-tile__details-label']} ${classes['event-tile__details-label--red']}`}
            >
              Tickets left:
            </span>
            {availableTickets}
          </p>
          <p>
            <span
              className={`${classes['event-tile__details-label']} ${classes['event-tile__details-label--blue']}`}
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

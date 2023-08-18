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
    <div className={classes.eventTile}>
      {hasRemove && (
        <button className={classes.eventTileRemove} onClick={handleRemove}>
          ✖
        </button>
      )}
      <Link to={`/event/${id}`} className={classes.eventTileLink}>
        <Image className={classes.eventTileImage} src={image} alt={title} />
      </Link>
      <div className={classes.eventTileDetails}>
        <h2 className={classes.eventTileDetailsTitle}>{title}</h2>
        <p className={classes.eventTileDetailsCategory}>{category}</p>
        <p>
          <span className={classes.eventTileDetailsLabel}>Location:</span>
          {location}
        </p>
        <p>
          <span className={classes.eventTileDetailsLabel}>When:</span>
          {eventDate}
        </p>
        <p>
          <span className={classes.eventTileDetailsLabel}>Starts at:</span>
          {eventTime}
        </p>
        <p>
          <span className={classes.eventTileDetailsLabel}>Price:</span>
          {displayPrice} {currency}
        </p>
      </div>
      <div className={classes.eventTileDetailsActions}>
        <div className={classes.eventTileDetailsActionsAvailability}>
          <p>
            <span
              className={`${classes.eventTileDetailsLabel} ${classes.eventTileDetailsLabelRed}`}
            >
              Tickets left:
            </span>
            {availableTickets}
          </p>
          <p>
            <span
              className={`${classes.eventTileDetailsLabel} ${classes.eventTileDetailsLabelBlue}`}
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

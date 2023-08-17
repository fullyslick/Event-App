import classes from './EventsList.module.css';
import EventTile from './EventTile';

import { EventListings } from '../../types';
import React from 'react';

interface EventListProps {
  events: EventListings;
  hasRemove?: boolean;
  hasStepper?: boolean;
}

const EventsList: React.FC<EventListProps> = ({
  events = [],
  hasRemove = false,
  hasStepper = true,
}) => {
  return (
    <div className={classes.events}>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <EventTile
              event={event}
              hasRemove={hasRemove}
              hasStepper={hasStepper}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;

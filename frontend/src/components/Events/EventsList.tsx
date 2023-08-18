import styles from './EventsList.module.css';
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
    <div className={styles.events}>
      <ul className={styles.list}>
        {events.map((event) => (
          <li key={event.id} className={styles.item}>
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

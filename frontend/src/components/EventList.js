import classes from './EventsList.module.css';
import EventTile from './EventTile';

function EventsList({ events }) {
    return (
        <div className={classes.events}>
            <h1>Events</h1>
            <ul className={classes.list}>
                {events.map((event) => (
                    <li key={event.id} className={classes.item}>
                        <EventTile event={event} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventsList;
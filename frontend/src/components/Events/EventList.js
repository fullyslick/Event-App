import classes from './EventsList.module.css';
import EventTile from './EventTile';
import PropTypes from 'prop-types';

function EventsList({ events }) {    
    return (
        <div className={classes.events}>
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

EventsList.defaultProps = {
    events: []
};

EventsList.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            categoryId: PropTypes.string.isRequired,
            ticketsWishList: PropTypes.number.isRequired,
            availableTickets: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired
        })
    )
};

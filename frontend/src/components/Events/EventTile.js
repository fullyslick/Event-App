import { Link } from 'react-router-dom';
import classes from './EventTile.module.css';
import Stepper from '../UI/Stepper';
import PropTypes from 'prop-types';

const EventTile = ({ event }) => {
    const { id, title, image, location, date, ticketsWishList, price } = event;

    return (
        <div className={classes['event-tile']}>
            <Link to={`/events/${id}`} className={classes['event-tile__link']}>
                <img className={classes['event-tile__image']} src={image} alt={title} />
            </Link>
            <div className={classes['event-tile__details']}>
                <h2 className={classes['event-tile__details-title']}>{title}</h2>
                <p>{location}</p>
                <p>{date}</p>
                <p>Price: {price}</p>
            </div>
            <Stepper id={id} ticketsInWishlist={ticketsWishList} />
        </div>
    );
}

export default EventTile;

EventTile.defaultProps = {
    events: {}
};

EventTile.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        ticketsWishList: PropTypes.number.isRequired,
        availableTickets: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired
    })
};
import { Link } from 'react-router-dom';
import classes from './EventTile.module.css';

const EventTile = ({ event }) => {
    const { id, title, image, location, date, ticketsWishList } = event;

    return (
        <div className={classes['event-tile']}>
            <Link to={`/events/${id}`} className={classes['event-tile__link']}>
                <img className={classes['event-tile__image']} src={image} alt={title} />
            </Link>
            <div className={classes['event-tile__details']}>
                <h2 className={classes['event-tile__details-title']}>{title}</h2>
                <p>{location}</p>
                <p>{date}</p>
            </div>
            <div className={classes['event-tile__wishlist-stepper']}>
                <button className={classes['event-tile__wishlist-stepper-btn--minus']}>-</button>
                <span className={classes['event-tile__wishlist-stepper-value']}>{ticketsWishList}</span>
                <button className={classes['event-tile__wishlist-stepper-btn--plus']}>+</button>
            </div>
        </div>
    );
}

export default EventTile;
import PropTypes from 'prop-types';
import classes from './Stepper.module.css';

const Stepper = ({ id, ticketsInWishlist }) => {

    const handleIncrement = () => {
        // TODO dispatch increment in wishlist using the id
        // Should not go above available qty for this event
    };

    const handleDecrement = () => {
        // TODO dispatch decrement in wishlist using the id
        // Should not go below 0
    };

    return (
        <div className={classes['stepper']}>
            <button className={classes['stepper-btn--minus']}>-</button>
            <span className={classes['stepper-value']}>{ticketsInWishlist}</span>
            <button className={classes['stepper-btn--plus']}>+</button>
        </div>
    );
}

export default Stepper;

Notification.propTypes = {
    id: PropTypes.string.isRequired,
    ticketsInWishlist: PropTypes.isRequired
};
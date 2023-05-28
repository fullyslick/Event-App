import PropTypes from 'prop-types';
import classes from './Stepper.module.css';
import { useDispatch } from 'react-redux';
import { eventsActions } from '../../store/events-slice';

const Stepper = ({ id, ticketsInWishlist }) => {

    const dispatch = useDispatch();

    const handleIncrement = () => {       
        dispatch(eventsActions.addToWishLst(id));
    };

    const handleDecrement = () => {
        // TODO dispatch decrement in wishlist using the id
        // Should not go below 0
    };

    return (
        <div className={classes['stepper']}>
            <button className={classes['stepper-btn--minus']}>-</button>
            <span className={classes['stepper-value']}>{ticketsInWishlist}</span>
            <button className={classes['stepper-btn--plus']} onClick={handleIncrement}>+</button>
        </div>
    );
}

export default Stepper;

Notification.propTypes = {
    id: PropTypes.string.isRequired,
    ticketsInWishlist: PropTypes.isRequired
};
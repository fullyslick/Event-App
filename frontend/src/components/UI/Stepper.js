import { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Stepper.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { eventsActions } from '../../store/events-slice';

const Stepper = ({ eventId }) => {
  const [qty, setQty] = useState(0);

  const eventCapacity = useSelector((state) =>
    state.events.events.filter((event) => event.id === eventId)
  )[0].availableTickets;

  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (qty === eventCapacity) {
      return;
    }

    setQty((prevQty) => (prevQty += 1));
  };

  const handleDecrement = () => {
    if (qty === 0) {
      return;
    }

    setQty((prevQty) => (prevQty -= 1));
  };

  const handleAddToWishlist = () => {
    if (qty) {
      dispatch(eventsActions.addToWishLst({ id: eventId, qty: qty }));
      setQty(0);
    }
  };

  return (
    <div className={classes['stepper']}>
      <div className={classes['stepper--buttons']}>
        <button
          disabled={!eventCapacity}
          className={classes['stepper-btn--minus']}
          onClick={handleDecrement}
        >
          -
        </button>
        <span
          className={`${classes['stepper-value']} ${
            eventCapacity ? '' : classes['stepper-value-disabled']
          }`}
        >
          {qty}
        </span>
        <button
          disabled={!eventCapacity}
          className={classes['stepper-btn--plus']}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <button
        className={classes['stepper--action']}
        disabled={!eventCapacity}
        onClick={handleAddToWishlist}
      >
        Add
      </button>
    </div>
  );
};

export default Stepper;

Stepper.propTypes = {
  eventId: PropTypes.string.isRequired,
};

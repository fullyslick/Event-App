import classes from './Event.module.css';
import Stepper from '../UI/Stepper';
import Image from '../UI/Image';
import PropTypes from 'prop-types';

const Event = ({ event }) => {
  const {
    id,
    title,
    imageOriginal,
    location,
    date,
    ticketsWishList,
    displayPrice,
    price,
    category,
    currency,
    availableTickets,
    description,
    address,
  } = event;

  const eventDate = date.split('T')[0].split('-').join(' ');
  let eventTime = date.split('T')[1].split(':');
  eventTime.pop();
  eventTime = eventTime.join(':');
  const totalPrice = (price * ticketsWishList) / 100;

  return (
    <div className={classes['event']}>
      <div className={classes['event__image--frame']}>
        <Image
          className={classes['event__image']}
          src={imageOriginal}
          alt={title}
        />
      </div>
      <div className={classes['event__details']}>
        <h2 className={classes['event__details-title']}>{title}</h2>
        <p className={classes['event__details-category']}>{category}</p>
        <p>
          <span className={classes['event__details-label']}>About:</span>
          {description}
        </p>
        <p>
          <span className={classes['event__details-label']}>Location:</span>
          {location} {address}
        </p>
        <p>
          <span className={classes['event__details-label']}>When:</span>
          {eventDate}
        </p>
        <p>
          <span className={classes['event__details-label']}>Starts at:</span>
          {eventTime}
        </p>
      </div>
      <div className={classes['event__details-actions']}>
        <div className={classes['event__details-actions--availability']}>
          <p>
            <span
              className={`${classes['event__details-label']} ${classes['event__details-label--red']}`}
            >
              Tickets left:
            </span>
            {availableTickets}
          </p>
          <p>
            <span
              className={`${classes['event__details-label']} ${classes['event__details-label--blue']}`}
            >
              Wish list:
            </span>
            {ticketsWishList}
          </p>
          <p>
            <span className={classes['event__details-label']}>Price:</span>
            {displayPrice} {currency}
          </p>
          <hr></hr>
          <p>
            <span className={classes['event__details-label']}>Total:</span>
            {totalPrice}
          </p>
        </div>
        <Stepper id={id} ticketsInWishlist={ticketsWishList} />
      </div>
    </div>
  );
};

export default Event;

Event.defaultProps = {
  events: {},
};

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageOriginal: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    ticketsWishList: PropTypes.number.isRequired,
    availableTickets: PropTypes.number.isRequired,
    displayPrice: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }),
};

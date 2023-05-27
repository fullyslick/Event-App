import PropTypes from 'prop-types';
import classes from './Notification.module.css';

const Notification = ({ status, title, message }) => {
    let specialClasses = '';

    if (status === 'error') {
        specialClasses = classes.error;
    }
    if (status === 'success') {
        specialClasses = classes.success;
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    return (
        <section className={cssClasses}>
            <h2>{title}</h2>
            <p>{message}</p>
        </section>
    );
};

export default Notification;

Notification.defaultProps = {
    status: '',
    title: '',
    message: ''
};

Notification.propTypes = {
    status: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
};

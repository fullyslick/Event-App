import classes from './ContentWrapper.module.css';
import PropTypes from 'prop-types';

const ContentWrapper = ({ title, children }) => {
  return (
    <div className={classes.content}>
      <h1 className={classes['content-title']}>{title}</h1>
      {children}
    </div>
  );
};

export default ContentWrapper;

ContentWrapper.defaultProps = {
  title: '',
};

ContentWrapper.propTypes = {
  title: PropTypes.string,
};

import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import classes from './Image.module.css';

const Image = ({ src, alt, className }) => {
  return (
    <div className={classes['image-lazyload']}>
      <LazyLoadImage className={className} src={src} effect='blur' alt={alt} />
    </div>
  );
};

export default Image;

Image.defaultProps = {
  alt: '',
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

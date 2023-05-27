import PropTypes from 'prop-types';
import { LazyLoadImage } from "react-lazy-load-image-component";
import classes from './Image.module.css';

const Image = ({ src, alt, width, height, className }) => {
    return (
        <div className={classes['image-lazyload']}>
            <LazyLoadImage
                className={className}
                src={src}
                width={width}
                height={height}                
                effect="blur"
                alt={alt}        
            />
        </div>
    )
};

export default Image;

Notification.defaultProps = {
    alt: '',
    width: 0,
    height: 0,
};

Notification.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
};
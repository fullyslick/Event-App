import PropTypes from 'prop-types';
import classes from './SearchBar.module.css';

const SearchBar = ({ onInputChange }) => {
    return (
        <div className={classes['search-bar']}>
            <input className={classes['search-bar__input']} type='text' onChange={onInputChange} placeholder='Search term...'/>
        </div>
    )
}

export default SearchBar;

SearchBar.defaultProps = {
    onInputChange: () => { }
};

SearchBar.propTypes = {
    onInputChange: PropTypes.func
};
import PropTypes from 'prop-types';
import classes from './CategoryTags.module.css';

const CategoryTags = ({ categories, selectedCategory, onTagClick }) => {
  return (
    <ul className={classes['category-tags']}>
      {categories.map((category) => (
        <li key={category.trim()} className={classes['category-tags__item']}>
          <button
            className={`${classes['category-tags__button']} ${
              selectedCategory === category
                ? classes['category-tags__button--active']
                : ''
            }`}
            onClick={onTagClick.bind(null, category)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryTags;

CategoryTags.defaultProps = {
  onTagClick: () => {},
  categories: [],
  selectedCategory: '',
};

CategoryTags.propTypes = {
  onTagClick: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
  selectedCategory: PropTypes.string,
};

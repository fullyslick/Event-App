import { useSelector } from 'react-redux';
import classes from './WishListTotals.module.css';

const WishListTotals = () => {
  const totalWishList = useSelector((state) => state.events.totalWishList);
  const totalPrice = useSelector(
    (state) => state.events.totalPrice / 100 + ' USD'
  );

  return (
    <div className={classes['wishlist-totals']}>
      <p>
        <span className={classes['wishlist-totals--title']}>Total Items:</span>
        {totalWishList}
      </p>
      <p>
        <span className={classes['wishlist-totals--title']}>Total Price:</span>
        {totalPrice}
      </p>
    </div>
  );
};

export default WishListTotals;

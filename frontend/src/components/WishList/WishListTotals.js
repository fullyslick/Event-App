import { useSelector } from 'react-redux';
import {
  selectTotalWishList,
  selectTotalPrice,
} from '../../store/events-slice';

import classes from './WishListTotals.module.css';

const WishListTotals = () => {
  const totalWishList = useSelector(selectTotalWishList);
  const totalPrice = useSelector(selectTotalPrice) / 100 + ' USD';

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

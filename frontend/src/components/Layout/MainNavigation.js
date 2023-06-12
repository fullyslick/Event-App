import { NavLink } from 'react-router-dom';
import { selectIsAnimatedCounter } from '../../store/ui-slice';
import { useSelector } from 'react-redux';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const wishlistCount = useSelector((state) => state.events.totalWishList);
  const isAnimatedCounter = useSelector(selectIsAnimatedCounter);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/new-event'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Create Event
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/wishlist'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <span
                className={`${classes['navigation-counter']} ${
                  isAnimatedCounter ? classes['navigation-counter--bump'] : ''
                }`}
              >
                Wish List ( {wishlistCount} )
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

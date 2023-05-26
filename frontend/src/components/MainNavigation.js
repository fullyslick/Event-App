import { NavLink } from "react-router-dom"

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to='/'
                            className={({ isActive }) => isActive ? classes.active : undefined}
                            end                           
                        >
                            Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/new-event'
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >
                            Create Event
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/wishlist'
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >
                            Wish List
                        </NavLink>
                    </li>                    
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;
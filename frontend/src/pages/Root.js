import { Outlet } from 'react-router-dom';

import classes from './Root.module.css'
import MainNavigation from '../components/Layout/MainNavigation';

const RootLayout = () => {
    return (<>
        <MainNavigation />
        <main className={classes.main}>
            <Outlet />
        </main>
    </>)
}

export default RootLayout;
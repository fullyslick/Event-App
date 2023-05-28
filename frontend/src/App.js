import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Error from './pages/Error';
import './App.css';
import RootLayout from './pages/Root';
import WishList from './pages/WishList';
import CreateEvent from './pages/CreateEvent';
import { useEffect } from 'react';
import localStorageHelper from './utils/local-storage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'wishlist', element: <WishList /> },
      { path: 'new-event', element: <CreateEvent /> },
    ]
  }
]);

function App() {
  // On App mount read localStorage
  // If user wishlist do not exists, create it
  useEffect(() => {
    localStorageHelper.initStorage();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

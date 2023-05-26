import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Error from './pages/Error';
import './App.css';
import RootLayout from './pages/Root';
import WishList from './pages/WishList';
import CreateEvent from './pages/CreateEvent';

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
  return <RouterProvider router={router} />;
}

export default App;

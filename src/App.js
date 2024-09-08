import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestHomePage from './testHomePage';
import Chat from './Chat';
import Layout from './Layout';
import Login from './Login';
import Signup from './Signup';
import NoPermission from './NoPermission'
import PrivateRoute  from './PrivateRoute';
import Settings from './Settings';

const router = createBrowserRouter([
  {
    path: 'home/',
    element: <PrivateRoute><Layout /></PrivateRoute>,
    children: [
      { path: 'chat/', element: <PrivateRoute> <Chat /> </PrivateRoute>},
      { path: '', element: <PrivateRoute><TestHomePage /></PrivateRoute> },
      { path: 'settings/', element: <PrivateRoute><Settings /></PrivateRoute> },
    ],
  },
  {
    path: '/',
    element: <Login />
  },
  { 
    path: 'signup/', 
    
    element: <Signup /> 
  },
  {
    path: 'permissionDenied/',
    element: <NoPermission/>
  },
  
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;


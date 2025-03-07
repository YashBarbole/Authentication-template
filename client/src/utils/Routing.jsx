import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import Home from '../components/Home';
import Farmer from '../components/Farmer';
import Mentor from '../components/Mentor';
import Exporter from '../components/Exporter';

const router = createBrowserRouter([

    {
        path : "/",
        element : <Home/>
    },

    {
        path: "/farmer-dashboard",
        element: <Farmer/>
    },

    {
        path: "/mentor-dashboard",
        element: <Mentor/>
    },

    {
        path: "/exporter-dashboard", 
        element: <Exporter/>
    },

    {
        path: "/signup",
        element: <Signup />
    },
    
    {
        path: "/login",
        element: <Login />
    }
]);

const Routing = () => {
    return <RouterProvider router={router} />;
};

export default Routing;

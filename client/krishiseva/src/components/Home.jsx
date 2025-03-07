import { Link } from 'react-router-dom';
import React from 'react';

const Home = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to KrishiSeva </h1>
            <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Signup</Link>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
        </div>
    );
};

export default Home;

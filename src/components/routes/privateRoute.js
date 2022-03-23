import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PrivateRoute = () => {    
    const user = localStorage.getItem('user')
    let auth = useSelector(state => state.authReducer)    
    
    if (user) {
        auth = user
    }   
    
    return (
        // If authorized, return an outlet that will render child elements
        // If not, return element that will navigate to login page
        auth ? <Outlet /> : <Navigate to="/" />
    );
};

export default PrivateRoute;
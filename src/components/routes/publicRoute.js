import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const user = localStorage.getItem('user')
    let auth = useSelector(state => state.authReducer)    
    
    if (user) {
        auth = user
    }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute;
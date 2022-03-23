import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const useAuth = () => {
    const user = localStorage.getItem('user')
    let auth = useSelector(state => state.authReducer)

    console.log("user useAuth==>",user);
    console.log("auth useAuth==>",auth);

    if (user) {
        auth = JSON.parse(user)
    }

    return auth
}

const PrivateRoute = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Navigate to="/" />
};

export default PrivateRoute;
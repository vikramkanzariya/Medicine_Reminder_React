import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = ({children}) => {
   const {isLoggedIn} = useAuthContext();
   
    if(isLoggedIn){
        return children;
    }
    else{
        return <Navigate to='/login'/>
    }
}

export default PrivateRoute
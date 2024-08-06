import React,{useContext} from 'react'
import {Navigate, Outlet,useLocation} from "react-router-dom"
import { userContext } from '../store/authprovider';

const ProtectedRoute = ({children}) => {
    const {isloggedin} = useContext(userContext)
    const userToken = localStorage.getItem("accessToken")
    let location = useLocation();
    console.log("protecedd")
    if(!isloggedin && !userToken) {
        return <Navigate to="/signin" state={{ from: location}} replace />
    }
 return <Outlet/>

};

export default ProtectedRoute;

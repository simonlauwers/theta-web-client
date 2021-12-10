import React from 'react'
import useAuth from '../hooks/UseAuth';
import { Route, useNavigate, Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    console.log("rendering private route")
    const { user } = useAuth()
    return user ? <Outlet /> : <Navigate to="/auth/login" />
}
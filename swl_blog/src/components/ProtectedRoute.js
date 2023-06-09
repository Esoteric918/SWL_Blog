import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/authContext'


const ProtectedRoute = (props) => {
  const { user } = UserAuth();
  // console.log("user", user);
    if (!user) {
      return <Navigate to="/login" />
    }
  return [props.children];

}

export default ProtectedRoute
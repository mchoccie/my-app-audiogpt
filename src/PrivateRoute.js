import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children}) => {
    const token =  localStorage.getItem('authToken');
        
    if (token ) {
      return children
    }
      
    return <Navigate to="/permissionDenied" />;
  }

export default PrivateRoute
// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ isAuth, children }) {
  // If not authenticated, redirect to login
  if (!isAuth) {
    return <Navigate to="/" replace />;  // or to="/landingpage"
  }
  // Otherwise, render the protected component
  return children;
}

import React, { useContext } from 'react'
import { UserAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom';
type PrivateRouteProps = {
  children: React.ReactElement,
}
export const PrivateRoute = ({
  children
}: PrivateRouteProps) => {
  const AuthContext: AuthContext = useContext(UserAuth);
  return (AuthContext?.user) ? children : <Navigate to="/login" replace />;
}

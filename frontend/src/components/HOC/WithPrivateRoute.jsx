import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

function WithPrivateRoute({ children }) {
  console.log('Private Route');
  const { authUser } = useSelector((state) => state.auth.value);
  const { username } = useParams();
  console.log(authUser, username);
  if (authUser) {
    if (!username) return children;
    if (username && authUser === username) return children;
    return <Navigate to="/signin" />;
  }

  return <Navigate to="/signin" />;
}

export default WithPrivateRoute;

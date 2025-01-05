import UserAuth from './UserAuth';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, user } = UserAuth();

  if (isAuthenticated && user.role === 'admin') {
    return <Component {...rest} />;
  } 
  else {
    return <div>
        <h1>Unauthorized</h1>
        <p>You do not have the necessary permissions to access this page.</p>
    </div>;
  }
};

export default ProtectedRoute;
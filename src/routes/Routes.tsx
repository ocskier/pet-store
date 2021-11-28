// Dependency imports
import { Navigate, RouteProps } from 'react-router-dom';

// Custom route props interface extending React props to allow for auth, restricted,
// and children prop values to be passed in
interface CustomRouteProps extends RouteProps {
  auth?: boolean;
  children: JSX.Element;
  restricted?: boolean;
}

// Custom route that if authenticated shows the component else reroutes to login
export const ProtectedRoute = ({ auth, children }: CustomRouteProps) => {
  return <>{auth ? children : <Navigate to="/login" />}</>;
};

// Custom route for all however if /login and user authenticted reroutes to Dashboard
export const PublicRoute = ({ auth, children, restricted }: CustomRouteProps) => {
  return <>{auth && restricted ? <Navigate to={'/dashboard'} /> : children}</>;
};

import { Navigate, RouteProps } from 'react-router-dom';

interface CustomRouteProps extends RouteProps {
  auth?: boolean;
  children: JSX.Element;
  restricted?: boolean;
}

export const ProtectedRoute = ({ auth, children }: CustomRouteProps) => {
  return <>{auth ? children : <Navigate to="/login" />}</>;
};

export const PublicRoute = ({ auth, children, restricted }: CustomRouteProps) => {
  return <>{auth && restricted ? <Navigate to={'/dashboard'} /> : children}</>;
};

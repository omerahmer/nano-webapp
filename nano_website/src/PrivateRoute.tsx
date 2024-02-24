import React, { ReactElement, ComponentType } from 'react';
import { Route, RouteProps, Navigate } from 'react-router-dom';

type PrivateRouteProps = RouteProps & {
  component: ComponentType<any>;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    isAuthenticated,
    ...rest
  }: PrivateRouteProps): ReactElement | null => {
    if (!isAuthenticated) {
      // Redirect or navigate to the login page
      return <Navigate to="/login" />;
    }
  
    if (Component) {
      return <Route {...rest} element={<Component />} />;
    }
    return null;
  };

export default PrivateRoute;

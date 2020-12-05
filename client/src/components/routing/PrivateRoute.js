import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(({ auth }) => auth.user);
  const loading = useSelector(({ auth }) => auth.loading);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : user ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;

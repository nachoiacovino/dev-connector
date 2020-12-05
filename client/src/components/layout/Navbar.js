import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutStart } from '../../redux/auth/authActions';

const Navbar = () => {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();

  const logout = () => dispatch(logoutStart());

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <a href='profiles.html'>Developers</a>
        </li>
        {user ? (
          <li>
            <a onClick={logout} href='#!'>
              Logout
            </a>
          </li>
        ) : (
          <>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

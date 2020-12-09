import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutStart } from '../../redux/auth/authActions';

const Navbar = () => {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();

  const logout = () => dispatch(logoutStart());

  const authLinks = (
    <>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <i className='fas fa-user' />
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <i className='fas fa-sign-out-alt' />
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        {user ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

export default Navbar;

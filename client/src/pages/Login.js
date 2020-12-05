import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Alerts from '../components/layout/Alerts';
import { loginStart } from '../redux/auth/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ email, password }) => {
    dispatch(loginStart({ email, password }));
  };

  if (user) return <Redirect to='/dashboard' />;

  return (
    <section className='container'>
      <Alerts />
      {/* <div className='alert alert-danger'>Invalid credentials</div> */}
      <h1 className='large text-primary'>Login</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            required
            ref={register({ required: true })}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            ref={register({ required: true })}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </section>
  );
};

export default Login;

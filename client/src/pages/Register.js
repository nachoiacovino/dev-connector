import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Alerts from '../components/layout/Alerts';
import { setAlert } from '../redux/alerts/alertsActions';
import { registerStart } from '../redux/auth/authActions';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const user = useSelector(({ auth }) => auth.user);

  const dispatch = useDispatch();

  const onSubmit = ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      dispatch(
        setAlert({ msg: 'Passwords do not match', alertType: 'danger' }),
      );
    } else {
      dispatch(registerStart({ name, email, password }));
    }
  };

  if (user) return <Redirect to='/dashboard' />;

  return (
    <section className='container'>
      <Alerts />
      <h1 className='large text-primary'>Register</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            required
            ref={register({ required: true })}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            required
            ref={register({ required: true })}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            ref={register({ required: true })}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            minLength='6'
            ref={register({ required: true })}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </section>
  );
};

export default Register;

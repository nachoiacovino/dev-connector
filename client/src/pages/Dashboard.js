import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Education from '../components/dashboard/Education';
import Experience from '../components/dashboard/Experience';
import Alerts from '../components/layout/Alerts';
import Spinner from '../components/layout/Spinner';
import { deleteAccountStart } from '../redux/auth/authActions';
import { getProfileStart } from '../redux/profile/profileActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector(({ profile }) => profile.loading);
  const profile = useSelector(({ profile }) => profile.userProfile);

  useEffect(() => dispatch(getProfileStart()), [dispatch]);

  if (loading) return <Spinner />;

  if (profile?.type === 'no-profile')
    return (
      <section className='container'>
        <div>
          <p>You have yet to create your profile! Please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </div>
      </section>
    );

  return (
    <section className='container'>
      <Alerts />
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome John Doe
      </p>
      <div className='dash-buttons'>
        <Link to='/edit-profile' className='btn btn-light'>
          <i className='fas fa-user-circle text-primary'></i> Edit Profile
        </Link>

        <Link to='/add-experience' className='btn btn-light'>
          <i className='fab fa-black-tie text-primary'></i> Add Experience
        </Link>
        <Link to='/add-education' className='btn btn-light'>
          <i className='fas fa-graduation-cap text-primary'></i> Add Education
        </Link>
      </div>

      <Experience />
      <Education />

      <div className='my-2'>
        <button
          className='btn btn-danger'
          onClick={() => dispatch(deleteAccountStart())}
        >
          <i className='fas fa-user-minus' />
          Delete my profile
        </button>
      </div>
    </section>
  );
};

export default Dashboard;

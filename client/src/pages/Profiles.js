import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileItem from '../components/layout/ProfileItem';
import { getAllProfilesStart } from '../redux/profile/profileActions';

const Profiles = () => {
  const profiles = useSelector(({ profile }) => profile.profiles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProfilesStart());
  }, [dispatch]);

  return (
    <section className='container'>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and connect with
        developers
      </p>
      <div className='profiles'>
        {profiles?.map((profile) => (
          <ProfileItem key={profile._id} profile={profile} />
        ))}
      </div>
    </section>
  );
};

export default Profiles;

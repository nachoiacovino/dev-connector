import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../components/layout/Spinner';
import ProfileTop from '../components/profile/ProfileTop';
import { getProfileByIdStart } from '../redux/profile/profileActions';

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);
  const profile = useSelector(({ profile }) => profile.currentProfile);
  const params = useParams();

  useEffect(() => {
    dispatch(getProfileByIdStart(params.id));
  }, [dispatch, params.id]);

  if (!profile) return <Spinner />;

  return (
    <section className='container'>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {!auth.loading && auth.user._id === profile.user._id && (
        <Link to='/edit-profile' className='btn btn-dark'>
          Edit Profile
        </Link>
      )}
      <div className='profile-grid my-1'>
        <ProfileTop profile={profile} />
        {/*  <ProfileAbout profile={profile} />  */}
        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>
          {/*           {profile.experience.length > 0 ? (
            <>
              {profile.experience.map((experience) => (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )} */}
        </div>

        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          {/*           {profile.education.length > 0 ? (
            <>
              {profile.education.map((education) => (
                <ProfileEducation key={education._id} education={education} />
              ))}
            </>
          ) : (
            <h4>No education credentials</h4>
          )} */}
        </div>

        {/*         {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )} */}
      </div>
    </section>
  );
};

export default Profile;

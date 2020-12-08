import { Link } from 'react-router-dom';

const ProfileItem = ({ profile }) => {
  return (
    <div className='profile bg-light'>
      <img className='round-img' src={profile.user?.avatar} alt='' />
      <div>
        <h2>{profile.user?.name}</h2>
        <p>
          {profile.status} at {profile.company}
        </p>
        <p>{profile.location}</p>
        <Link to={`/profile/${profile.user._id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {profile.skills.map((skill, idx) => (
          <li key={idx} className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;

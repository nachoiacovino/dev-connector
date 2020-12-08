import formatDate from '../../utils/formatDate';

const ProfileExperience = ({
  experience: { company, title, location, to, from, description },
}) => (
  <div>
    <h3 className='text-dark'>{company}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Now'}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Location: </strong> {location}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

export default ProfileExperience;

import { useDispatch, useSelector } from 'react-redux';

import { deleteExperienceStart } from '../../redux/profile/profileActions';
import formatDate from '../../utils/formatDate';

const Experience = () => {
  const experience = useSelector(
    ({ profile }) => profile.userProfile?.experience,
  );
  const dispatch = useDispatch();

  const experiences = experience?.map((xp) => (
    <tr key={xp._id}>
      <td>{xp.company}</td>
      <td className='hide-sm'>{xp.title}</td>
      <td>
        {formatDate(xp.from)} - {xp.to ? formatDate(xp.to) : 'Now'}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperienceStart(xp._id))}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

export default Experience;

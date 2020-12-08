import { useDispatch, useSelector } from 'react-redux';

import { deleteEducationStart } from '../../redux/profile/profileActions';
import formatDate from '../../utils/formatDate';

const Education = () => {
  const education = useSelector(
    ({ profile }) => profile.userProfile?.education,
  );
  const dispatch = useDispatch();

  const educations = education?.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteEducationStart(edu._id))}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;

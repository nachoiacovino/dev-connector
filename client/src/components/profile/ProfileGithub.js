import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGithubReposStart } from '../../redux/profile/profileActions';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();
  const repos = useSelector(({ profile }) => profile.repos);

  useEffect(() => {
    dispatch(getGithubReposStart(username));
  }, [dispatch, username]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {repos.map((repo) => (
        <div key={repo.id} className='repo bg-white p-1 my-1'>
          <div>
            <h4>
              <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className='badge badge-primary'>
                Stars: {repo.stargazers_count}
              </li>
              <li className='badge badge-dark'>
                Watchers: {repo.watchers_count}
              </li>
              <li className='badge badge-light'>Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileGithub;

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { addExperienceStart } from '../redux/profile/profileActions';

const AddExperience = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(addExperienceStart(data));
    history.push('/dashboard');
  };

  return (
    <section className='container'>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            required
            ref={register({ required: true })}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            required
            ref={register({ required: true })}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            ref={register}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' ref={register} />
        </div>
        <div className='form-group'>
          <p>
            <input type='checkbox' name='current' value='' ref={register} />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input type='date' name='to' ref={register} />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols={30}
            rows={5}
            placeholder='Job Description'
            ref={register}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default AddExperience;

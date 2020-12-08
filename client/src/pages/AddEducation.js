import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { addEducationStart } from '../redux/profile/profileActions';

const AddEducation = () => {
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const current = watch('current', false);

  const onSubmit = (data) => {
    dispatch(addEducationStart(data));
    console.log(data);
    history.push('/dashboard');
  };

  return (
    <section className='container'>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            required
            ref={register({ required: true })}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required
            ref={register({ required: true })}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
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
            Current School or Bootcamp
          </p>
        </div>
        {!current && (
          <div className='form-group'>
            <h4>To Date</h4>
            <input type='date' name='to' ref={register} />
          </div>
        )}
        <div className='form-group'>
          <textarea
            name='description'
            cols={30}
            rows={5}
            placeholder='Program Description'
            ref={register}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard/'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default AddEducation;

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { addPostStart } from '../../redux/posts/postsActions';

const PostForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => dispatch(addPostStart(data));

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form className='form my-1' onSubmit={handleSubmit(onSubmit)}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          ref={register({ required: true })}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default PostForm;

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addCommentStart } from '../../redux/posts/postsActions';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => dispatch(addCommentStart({ postId, data }));

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form className='form my-1' onSubmit={handleSubmit(onSubmit)}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment the post'
          ref={register({ required: true })}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default CommentForm;

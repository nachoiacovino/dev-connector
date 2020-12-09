import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteCommentStart } from '../../redux/posts/postsActions';
import formatDate from '../../utils/formatDate';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>Posted on {formatDate(date)}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() =>
              dispatch(deleteCommentStart({ postId, commentId: _id }))
            }
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;

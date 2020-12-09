import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../components/layout/Spinner';
import CommentForm from '../components/post/CommentForm';
import CommentItem from '../components/post/CommentItem';
import PostItem from '../components/posts/PostItem';
import { getPostStart } from '../redux/posts/postsActions';

const Post = () => {
  const dispatch = useDispatch();

  const post = useSelector(({ posts }) => posts.post);
  const params = useParams();

  useEffect(() => {
    dispatch(getPostStart(params.id));
  }, [dispatch, params.id]);

  if (!post) return <Spinner />;

  return (
    <section className='container'>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />

      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

export default Post;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostItem from '../components/posts/PostItem';
import { getAllPostsStart } from '../redux/posts/postsActions';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(({ posts }) => posts.posts);

  useEffect(() => {
    dispatch(getAllPostsStart());
  }, [dispatch]);

  return (
    <section className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      {/* <PostForm /> */}
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} showActions />
        ))}
      </div>
    </section>
  );
};

export default Posts;

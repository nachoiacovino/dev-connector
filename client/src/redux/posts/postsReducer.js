import { GET_ALL_POSTS_FAIL, GET_ALL_POSTS_SUCCESS } from './postsTypes';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: null,
};

export const posts = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        error: false,
        loading: false,
      };
    case GET_ALL_POSTS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

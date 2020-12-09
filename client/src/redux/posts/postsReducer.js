import {
  ADD_COMMENT_FAIL,
  ADD_LIKE_FAIL,
  ADD_POST_FAIL,
  ADD_POST_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_LIKE_FAIL,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  GET_ALL_POSTS_FAIL,
  GET_ALL_POSTS_SUCCESS,
  GET_POST_FAIL,
  GET_POST_SUCCESS,
} from './postsTypes';

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
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        loading: false,
        error: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
        error: null,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
        error: null,
      };
    case GET_POST_FAIL:
    case GET_ALL_POSTS_FAIL:
    case ADD_POST_FAIL:
    case DELETE_POST_FAIL:
    case ADD_LIKE_FAIL:
    case DELETE_LIKE_FAIL:
    case ADD_COMMENT_FAIL:
    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

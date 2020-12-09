import {
  ADD_COMMENT_START,
  ADD_LIKE_START,
  ADD_POST_START,
  DELETE_COMMENT_START,
  DELETE_LIKE_START,
  DELETE_POST_START,
  GET_ALL_POSTS_START,
  GET_POST_START,
} from './postsTypes';

export const getPostStart = (payload) => ({
  type: GET_POST_START,
  payload,
});

export const getAllPostsStart = () => ({
  type: GET_ALL_POSTS_START,
});

export const addPostStart = (payload) => ({
  type: ADD_POST_START,
  payload,
});

export const deletePostStart = (payload) => ({
  type: DELETE_POST_START,
  payload,
});

export const addLikeStart = (payload) => ({
  type: ADD_LIKE_START,
  payload,
});

export const deleteLikeStart = (payload) => ({
  type: DELETE_LIKE_START,
  payload,
});

export const addCommentStart = (payload) => ({
  type: ADD_COMMENT_START,
  payload,
});

export const deleteCommentStart = (payload) => ({
  type: DELETE_COMMENT_START,
  payload,
});

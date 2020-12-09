import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../utils/api';
import { setAlert } from '../alerts/alertsActions';
import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_START,
  ADD_COMMENT_SUCCESS,
  ADD_LIKE_FAIL,
  ADD_LIKE_START,
  ADD_LIKE_SUCCESS,
  ADD_POST_FAIL,
  ADD_POST_START,
  ADD_POST_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_LIKE_FAIL,
  DELETE_LIKE_START,
  DELETE_LIKE_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  GET_ALL_POSTS_FAIL,
  GET_ALL_POSTS_START,
  GET_ALL_POSTS_SUCCESS,
  GET_POST_FAIL,
  GET_POST_START,
  GET_POST_SUCCESS,
} from './postsTypes';

export function* getPost({ payload }) {
  try {
    const res = yield call(api.get, `/posts/${payload}`);

    yield put({ type: GET_POST_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: GET_POST_FAIL,
      payload: err,
    });
  }
}

export function* getAllPosts() {
  try {
    const res = yield call(api.get, '/posts');

    yield put({ type: GET_ALL_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: GET_ALL_POSTS_FAIL,
      payload: err,
    });
  }
}

export function* addPost({ payload }) {
  try {
    const res = yield call(api.post, '/posts', payload);

    yield put({ type: ADD_POST_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: ADD_POST_FAIL,
      payload: err,
    });
  }
}

export function* deletePost({ payload }) {
  try {
    yield call(api.delete, `/posts/${payload}`);

    yield put({ type: DELETE_POST_SUCCESS, payload });
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: DELETE_POST_FAIL,
      payload: err,
    });
  }
}

export function* addLike({ payload }) {
  try {
    const res = yield call(api.put, `/posts/like/${payload}`);

    yield put({ type: ADD_LIKE_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: ADD_LIKE_FAIL,
      payload: err,
    });
  }
}

export function* deleteLike({ payload }) {
  try {
    const res = yield call(api.delete, `/posts/like/${payload}`);

    yield put({ type: DELETE_LIKE_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: DELETE_LIKE_FAIL,
      payload: err,
    });
  }
}

export function* addComment({ payload }) {
  try {
    const res = yield call(api.post, `/posts/comment/${payload}`);

    yield put({ type: ADD_COMMENT_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: ADD_COMMENT_FAIL,
      payload: err,
    });
  }
}

export function* deleteComment({ payload }) {
  try {
    yield call(api.delete, `/posts/comment/${payload}`);

    yield put({ type: DELETE_COMMENT_SUCCESS, payload });
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: DELETE_COMMENT_FAIL,
      payload: err,
    });
  }
}

export default function* postsSagas() {
  yield takeLatest(GET_ALL_POSTS_START, getAllPosts);
  yield takeLatest(GET_POST_START, getPost);
  yield takeLatest(ADD_POST_START, addPost);
  yield takeLatest(DELETE_POST_START, deletePost);
  yield takeLatest(ADD_LIKE_START, addLike);
  yield takeLatest(DELETE_LIKE_START, deleteLike);
  yield takeLatest(ADD_COMMENT_START, addComment);
  yield takeLatest(DELETE_COMMENT_START, deleteComment);
}

import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../utils/api';
import { setAlert } from '../alerts/alertsActions';
import { GET_ALL_POSTS_FAIL, GET_ALL_POSTS_START, GET_ALL_POSTS_SUCCESS } from './postsTypes';

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

export default function* postsSagas() {
  yield takeLatest(GET_ALL_POSTS_START, getAllPosts);
}

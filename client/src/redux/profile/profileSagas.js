import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../utils/api';
import { setAlert } from '../alerts/alertsActions';
import { LOGOUT_SUCCESS } from '../auth/authTypes';
import {
  CLEAR_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
} from './profileTypes';

export function* getProfile() {
  try {
    const res = yield call(api.get, '/profile/me');

    yield put({ type: GET_PROFILE_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: GET_PROFILE_FAIL,
      payload: err,
    });
  }
}

export function* updateProfile({ payload }) {
  try {
    yield call(api.post, '/profile', payload);

    yield put({ type: UPDATE_PROFILE_SUCCESS });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      yield all(
        errors.map((error) =>
          put(setAlert({ msg: error.msg, alertType: 'danger' })),
        ),
      );
    }

    yield put({
      type: UPDATE_PROFILE_FAIL,
      payload: err,
    });
  }
}

export function* clearProfile() {
  yield put({ type: CLEAR_PROFILE });
}

export default function* profileSagas() {
  yield takeLatest(UPDATE_PROFILE_START, updateProfile);
  yield takeLatest(LOGOUT_SUCCESS, clearProfile);
  yield takeLatest(GET_PROFILE_START, getProfile);
}

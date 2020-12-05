import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../utils/api';
import { setAlert } from '../alerts/alertsActions';
import { GET_PROFILE_FAIL, GET_PROFILE_START, GET_PROFILE_SUCCESS } from './profileTypes';

export function* getProfile({ payload }) {
  console.log(payload);
  try {
    const res = yield api.get('/profile/me');

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

export function* onGetProfileStart() {
  yield takeLatest(GET_PROFILE_START, getProfile);
}

export default function* authSagas() {
  yield all([call(onGetProfileStart)]);
}

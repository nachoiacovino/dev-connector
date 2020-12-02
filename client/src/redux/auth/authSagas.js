import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../utils/api';
import { setAlert } from '../alerts/alertsActions';
import { LOGIN_START, LOGOUT_START, REGISTER_FAILED, REGISTER_START, REGISTER_SUCCESS } from './authTypes';

export function* register({ payload }) {
  try {
    const res = yield api.post('/users', payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    /* yield (loadUser()); */
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
      type: REGISTER_FAILED,
    });
  }
}

export function* onRegisterStart() {
  yield takeLatest(REGISTER_START, register);
}

export function* login({ payload }) {}

export function* onLoginStart() {
  yield takeLatest(LOGIN_START, login);
}

export function* logout({ payload }) {}

export function* onLogoutStart() {
  yield takeLatest(LOGOUT_START, logout);
}

export default function* authSagas() {
  yield all([call(onRegisterStart), call(onLoginStart), call(onLogoutStart)]);
}

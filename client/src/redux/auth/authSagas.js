import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../utils/api';
import { setAlert } from '../alerts/alertsActions';
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  SET_TOKEN,
} from './authTypes';

export function* loadUser(token) {
  try {
    yield put({
      type: SET_TOKEN,
      payload: token,
    });

    const res = yield api.get('/auth');

    yield put({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAIL,
      payload: err,
    });
  }
}

export function* register({ payload }) {
  try {
    const res = yield api.post('/users', payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });
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
      type: REGISTER_FAIL,
    });
  }
}

export function* onRegisterStart() {
  yield takeLatest(REGISTER_START, register);
}

export function* login({ payload }) {
  try {
    const res = yield api.post('/auth', payload);

    yield loadUser(res.data.token);
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
      type: LOGIN_FAIL,
      payload: err,
    });
  }
}

export function* onLoginStart() {
  yield takeLatest(LOGIN_START, login);
}

export function* registerSuccess({ payload }) {
  yield loadUser(payload);
}

export function* onRegisterSuccess() {
  yield takeLatest(REGISTER_SUCCESS, registerSuccess);
}

export function* logout() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAIL,
      payload: err,
    });
  }
}

export function* onLogoutStart() {
  yield takeLatest(LOGOUT_START, logout);
}

export default function* authSagas() {
  yield all([
    call(onRegisterStart),
    call(onLoginStart),
    call(onRegisterSuccess),
    call(onLogoutStart),
  ]);
}

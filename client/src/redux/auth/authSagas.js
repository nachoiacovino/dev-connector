import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../utils/api';
import { setAlert } from '../alerts/alertsActions';
import { CLEAR_PROFILE } from '../profile/profileTypes';
import {
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_SUCCESS,
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

    const res = yield call(api.get, '/auth');

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
    const res = yield call(api.post, '/users', payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });
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
      type: REGISTER_FAIL,
    });
  }
}

export function* login({ payload }) {
  try {
    const res = yield call(api.post, '/auth', payload);

    yield call(loadUser, res.data.token);
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
      type: LOGIN_FAIL,
      payload: err,
    });
  }
}

export function* registerSuccess({ payload }) {
  yield call(loadUser, payload);
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

export function* deleteAccount() {
  try {
    const confirm = yield window.confirm(
      'Are you sure? This cannot be undone!',
    );

    if (confirm) {
      yield call(api.delete, `/auth`);

      yield put({ type: DELETE_ACCOUNT_SUCCESS });
      yield put({ type: CLEAR_PROFILE });
      yield put(
        setAlert({
          msg: 'Your account has been permanently deleted',
          alertType: null,
        }),
      );
    }
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
      type: DELETE_ACCOUNT_FAIL,
      payload: err,
    });
  }
}

export default function* authSagas() {
  yield takeLatest(REGISTER_START, register);
  yield takeLatest(LOGIN_START, login);
  yield takeLatest(REGISTER_SUCCESS, registerSuccess);
  yield takeLatest(LOGOUT_START, logout);
  yield takeLatest(DELETE_ACCOUNT_START, deleteAccount);
}

import { all, call, takeLatest } from 'redux-saga/effects';

import { LOGIN_START, LOGOUT_START, REGISTER_START } from './authTypes';

export function* register({ payload }) {}

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

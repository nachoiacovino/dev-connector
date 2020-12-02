import { all, call, takeLatest } from 'redux-saga/effects';

import { REGISTER_START } from './authTypes';

export function* register({ payload }) {}

export function* onRegisterStart() {
  yield takeLatest(REGISTER_START, register);
}

export default function* authSagas() {
  yield all([call(onRegisterStart)]);
}

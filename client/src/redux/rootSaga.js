import { all, call } from 'redux-saga/effects';

import alertSagas from './alerts/alertsSagas';
import authSagas from './auth/authSagas';
import postsSagas from './posts/postsSagas';
import profileSagas from './profile/profileSagas';

export default function* rootSaga() {
  yield all([
    call(alertSagas),
    call(authSagas),
    call(profileSagas),
    call(postsSagas),
  ]);
}

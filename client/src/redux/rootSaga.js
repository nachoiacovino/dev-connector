import { all, call } from 'redux-saga/effects';

import alertSagas from './alerts/alertsSagas';
import authSagas from './auth/authSagas';

export default function* rootSaga() {
  yield all([call(alertSagas), call(authSagas)]);
}

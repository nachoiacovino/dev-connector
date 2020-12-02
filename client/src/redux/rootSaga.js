import { all, call } from 'redux-saga/effects';

import alertSagas from './alerts/alertsSagas';

export default function* rootSaga() {
  yield all([call(alertSagas)]);
}

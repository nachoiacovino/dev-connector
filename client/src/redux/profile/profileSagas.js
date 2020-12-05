import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../utils/api';
import { setAlert } from '../alerts/alertsActions';
import { GET_PROFILE_FAIL, GET_PROFILE_START, GET_PROFILE_SUCCESS } from './profileTypes';

export function* getProfile({ payload }) {
  console.log(payload);
  try {
    const res = yield api.get('/profile/me', {
      headers: {
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZjODI3MjE2ZDY5OTUzZDUwMzNiMjJiIn0sImlhdCI6MTYwNzEzMDQ2NCwiZXhwIjoxNjA3NTYyNDY0fQ.59lqAtpvY7OwCLq7h83qlNeyuJn7hpaNHc7hZ5FbETY',
      },
    });

    put({ type: GET_PROFILE_SUCCESS, payload: res.data });
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

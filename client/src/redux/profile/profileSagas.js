import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../utils/api';
import { setAlert } from '../alerts/alertsActions';
import { LOGOUT_SUCCESS } from '../auth/authTypes';
import {
  ADD_EDUCATION_FAIL,
  ADD_EDUCATION_START,
  ADD_EDUCATION_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_START,
  ADD_EXPERIENCE_SUCCESS,
  CLEAR_PROFILE,
  DELETE_EDUCATION_FAIL,
  DELETE_EDUCATION_START,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_START,
  DELETE_EXPERIENCE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
} from './profileTypes';

export function* getProfile() {
  try {
    const res = yield call(api.get, '/profile/me');

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

export function* updateProfile({ payload }) {
  try {
    yield call(api.post, '/profile', payload);

    yield put({ type: UPDATE_PROFILE_SUCCESS });
    yield put(
      setAlert({ msg: 'Profile updated successfully', alertType: 'success' }),
    );
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
      type: UPDATE_PROFILE_FAIL,
      payload: err,
    });
  }
}

export function* addExperience({ payload }) {
  try {
    yield call(api.put, '/profile/experience', payload);

    yield put({ type: ADD_EXPERIENCE_SUCCESS });
    yield put(
      setAlert({ msg: 'Experience added successfully', alertType: 'success' }),
    );
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
      type: ADD_EXPERIENCE_FAIL,
      payload: err,
    });
  }
}

export function* addEducation({ payload }) {
  try {
    yield call(api.put, '/profile/education', payload);

    yield put({ type: ADD_EDUCATION_SUCCESS });
    yield put(
      setAlert({ msg: 'Education added successfully', alertType: 'success' }),
    );
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
      type: ADD_EDUCATION_FAIL,
      payload: err,
    });
  }
}

export function* deleteExperience({ payload }) {
  try {
    yield call(api.delete, `/profile/experience/${payload}`);

    yield put({ type: DELETE_EXPERIENCE_SUCCESS });
    yield put(
      setAlert({
        msg: 'Experience deleted successfully',
        alertType: 'success',
      }),
    );
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
      type: DELETE_EXPERIENCE_FAIL,
      payload: err,
    });
  }
}

export function* deleteEducation({ payload }) {
  try {
    yield call(api.delete, `/profile/education/${payload}`);

    yield put({ type: DELETE_EDUCATION_SUCCESS });
    yield put(
      setAlert({ msg: 'Education deleted successfully', alertType: 'success' }),
    );
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
      type: DELETE_EDUCATION_FAIL,
      payload: err,
    });
  }
}

export function* clearProfile() {
  yield put({ type: CLEAR_PROFILE });
}

export default function* profileSagas() {
  yield takeLatest(UPDATE_PROFILE_START, updateProfile);
  yield takeLatest(LOGOUT_SUCCESS, clearProfile);
  yield takeLatest(GET_PROFILE_START, getProfile);
  yield takeLatest(ADD_EXPERIENCE_START, addExperience);
  yield takeLatest(ADD_EDUCATION_START, addEducation);
  yield takeLatest(DELETE_EXPERIENCE_START, deleteExperience);
  yield takeLatest(DELETE_EDUCATION_START, deleteEducation);
}

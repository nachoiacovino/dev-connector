import { v4 as uuid } from 'uuid';

import { DELETE_ALERT, SET_ALERT } from './alertsTypes';

export const setAlert = (payload) => ({
  type: SET_ALERT,
  payload: { id: uuid(), ...payload },
});

export const removeAlert = (payload) => ({
  type: DELETE_ALERT,
  payload,
});

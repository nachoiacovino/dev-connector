import { v4 as uuid } from 'uuid';

import { REMOVE_ALERT, SET_ALERT } from './alertTypes';

export const setAlert = (payload) => ({
  type: SET_ALERT,
  payload: { id: uuid(), ...payload },
});

export const removeAlert = (payload) => ({
  type: REMOVE_ALERT,
  payload,
});

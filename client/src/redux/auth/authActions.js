import { LOGIN_START, LOGOUT_START, REGISTER_START } from './authTypes';

export const registerStart = (payload) => ({
  type: REGISTER_START,
  payload,
});

export const loginStart = (payload) => ({
  type: LOGIN_START,
  payload,
});

export const logoutStart = (payload) => ({
  type: LOGOUT_START,
  payload,
});

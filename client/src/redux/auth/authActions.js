import { DELETE_ACCOUNT_START, LOGIN_START, LOGOUT_START, REGISTER_START } from './authTypes';

export const registerStart = (payload) => ({
  type: REGISTER_START,
  payload,
});

export const loginStart = (payload) => ({
  type: LOGIN_START,
  payload,
});

export const logoutStart = () => ({
  type: LOGOUT_START,
});

export const deleteAccountStart = () => ({
  type: DELETE_ACCOUNT_START,
});

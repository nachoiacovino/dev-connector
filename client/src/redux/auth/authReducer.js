import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_SUCCESS, REGISTER_FAILED, SET_TOKEN } from './authTypes';

const initialState = {
  user: null,
  loading: true,
  error: null,
};

export const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOGOUT_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

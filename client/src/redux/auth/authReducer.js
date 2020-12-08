import {
  DELETE_ACCOUNT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  SET_TOKEN,
} from './authTypes';

const initialState = {
  user: null,
  token: null,
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
        token: null,
        loading: false,
        error: null,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
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
    case DELETE_ACCOUNT_SUCCESS:
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

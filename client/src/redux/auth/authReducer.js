import { LOGIN_FAILED, LOGIN_SUCCESS, REGISTER_FAILED, SET_TOKEN } from './authTypes';

const initialState = {
  token: null,
  user: null,
  loading: true,
  error: null,
};

export const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      console.log(payload);
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
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

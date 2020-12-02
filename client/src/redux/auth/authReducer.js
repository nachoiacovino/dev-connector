import { REGISTER_FAILED, REGISTER_SUCCESS } from './authTypes';

const initialState = {
  token: null,
  user: null,
  loading: true,
  error: null,
};

export const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

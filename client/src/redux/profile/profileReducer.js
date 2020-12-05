import { CLEAR_PROFILE, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS } from './profileTypes';

const initialState = {
  userProfile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: false,
};

export const profile = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE_SUCCESS:
      return { ...state, userProfile: payload };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        userProfile: null,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

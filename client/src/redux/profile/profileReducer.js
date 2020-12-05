import { CLEAR_PROFILE, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL } from './profileTypes';

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
      return {
        ...state,
        userProfile: payload,
        error: false,
        loading: false,
      };
    case GET_PROFILE_FAIL:
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        userProfile: null,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

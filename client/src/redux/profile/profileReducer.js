import {
  ADD_EDUCATION_FAIL,
  ADD_EDUCATION_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_SUCCESS,
  CLEAR_PROFILE,
  DELETE_EDUCATION_FAIL,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_SUCCESS,
  GET_ALL_PROFILES_FAIL,
  GET_ALL_PROFILES_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from './profileTypes';

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
    case UPDATE_PROFILE_SUCCESS:
    case ADD_EXPERIENCE_SUCCESS:
    case ADD_EDUCATION_SUCCESS:
      return {
        ...state,
        userProfile: payload,
        error: false,
        loading: false,
      };
    case GET_ALL_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        error: false,
        loading: false,
      };
    case DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          experience: state.userProfile.experience.filter(
            (xp) => xp._id !== payload,
          ),
        },
        error: false,
        loading: false,
      };
    case DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          education: state.userProfile.education.filter(
            (edu) => edu._id !== payload,
          ),
        },
        error: false,
        loading: false,
      };
    case GET_PROFILE_FAIL:
    case GET_ALL_PROFILES_FAIL:
    case UPDATE_PROFILE_FAIL:
    case ADD_EXPERIENCE_FAIL:
    case ADD_EDUCATION_FAIL:
    case DELETE_EXPERIENCE_FAIL:
    case DELETE_EDUCATION_FAIL:
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

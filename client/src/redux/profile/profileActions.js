import { ADD_EDUCATION_START, ADD_EXPERIENCE_START, GET_PROFILE_START, UPDATE_PROFILE_START } from './profileTypes';

export const getProfileStart = () => ({
  type: GET_PROFILE_START,
});

export const updateProfileStart = (payload) => ({
  type: UPDATE_PROFILE_START,
  payload,
});

export const addExperienceStart = (payload) => ({
  type: ADD_EXPERIENCE_START,
  payload,
});

export const addEducationStart = (payload) => ({
  type: ADD_EDUCATION_START,
  payload,
});

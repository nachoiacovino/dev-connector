import {
  ADD_EDUCATION_START,
  ADD_EXPERIENCE_START,
  DELETE_EDUCATION_START,
  DELETE_EXPERIENCE_START,
  DELETE_PROFILE_START,
  GET_PROFILE_START,
  UPDATE_PROFILE_START,
} from './profileTypes';

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

export const deleteExperienceStart = (payload) => ({
  type: DELETE_EXPERIENCE_START,
  payload,
});

export const deleteEducationStart = (payload) => ({
  type: DELETE_EDUCATION_START,
  payload,
});

export const deleteProfileStart = (payload) => ({
  type: DELETE_PROFILE_START,
  payload,
});

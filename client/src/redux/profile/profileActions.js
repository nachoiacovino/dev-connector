import {
  ADD_EDUCATION_START,
  ADD_EXPERIENCE_START,
  DELETE_EDUCATION_START,
  DELETE_EXPERIENCE_START,
  GET_ALL_PROFILES_START,
  GET_GITHUB_REPOS_START,
  GET_PROFILE_BY_ID_START,
  GET_PROFILE_START,
  UPDATE_PROFILE_START,
} from './profileTypes';

export const getProfileStart = () => ({
  type: GET_PROFILE_START,
});

export const getAllProfilesStart = () => ({
  type: GET_ALL_PROFILES_START,
});

export const getProfileByIdStart = (payload) => ({
  type: GET_PROFILE_BY_ID_START,
  payload,
});

export const getGithubReposStart = (payload) => ({
  type: GET_GITHUB_REPOS_START,
  payload,
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

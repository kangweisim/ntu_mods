import { profile } from "../action_types";

const { UPDATE_SESSION, LOADING_PROFILE } = profile;

export function update_session(entity, access_token) {
  return {
    type: UPDATE_SESSION,
    entity, access_token
  }
}

export function loading_profile(loading) {
  return {
    type: LOADING_PROFILE,
    loading,
  }
}
import { env } from "../action_types";

const { UPDATE_ENV } = env;

export function update(payload) {
  return {
    type: UPDATE_ENV,
    payload
  }
};
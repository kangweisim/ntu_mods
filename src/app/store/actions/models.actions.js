import { models } from "../action_types";

const { UPDATE_MODELS } = models;

export function update_model(data) {
  return {
    type: UPDATE_MODELS,
    data,
  }
}
import { filters } from "../action_types";

const { UPDATE_FILTERS } = filters;

export function update_filters(data) {
  return {
    type: UPDATE_FILTERS,
    data,
  }
}
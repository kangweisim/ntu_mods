import { models } from "../action_types";

const { UPDATE_MODELS } = models;

const initial_state = {
  user: null,
  roles: [],
  projects: [],
  versions: [],
};

function models_reducer(state = initial_state, actions) {
  switch (actions.type) {
    case UPDATE_MODELS:
      return {
        ...state,
        ...actions.data
      };
    default:
      return state;
  };
}

export default models_reducer;

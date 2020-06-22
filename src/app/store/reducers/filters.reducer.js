import { constants } from "app/utils";
import { filters, INIT } from "../action_types";
const { UPDATE_FILTERS } = filters;

const initial_state = {
  modules: { ...constants.INIT_MODULES_FILTER },
  topics: { ...constants.INIT_MODULES_FILTER },
};

function filters_reducer(state = initial_state, actions) {
  switch (actions.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        ...actions.data
      };
    case INIT:
      return initial_state;
    default:
      return state;
  };
}

export default filters_reducer;

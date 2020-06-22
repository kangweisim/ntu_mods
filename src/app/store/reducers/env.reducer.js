import { env } from "../action_types";

const { UPDATE_ENV } = env;

const initial_state = {
  company: null,
};

function reducer(state = initial_state, actions) {
  switch (actions.type) {
    case UPDATE_ENV:
      return {
        ...state,
        ...actions.payload,
      };
    default:
      return state;
  };


}

export default reducer;

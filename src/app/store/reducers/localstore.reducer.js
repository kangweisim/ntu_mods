import { INIT, profile } from "../action_types";
import { constants } from "app/utils";

const { KEY_LOCAL_SAVE } = constants;
const { UPDATE_SESSION } = profile;

const initial_state = {
  access_token: null,
};

function profile_reducer(state = initial_state, actions) {
  switch (actions.type) {
    default:
      return state;
    case INIT:
      state = actions.state || {};
      return { ...state };
    case UPDATE_SESSION:
      state = {
        ...state,
        access_token: actions.access_token,
      };
      localStorage.setItem(KEY_LOCAL_SAVE, JSON.stringify(state));
      return { ...state };
  };


}

export default profile_reducer;

import { INIT, profile } from "../action_types";

const { UPDATE_SESSION, LOADING_PROFILE } = profile;

const initial_state = {
  entity: null,
  person: null,
  access_token: null,
  loading: false,
};

function profile_reducer(state = initial_state, actions) {
  switch (actions.type) {
    case INIT:
      state = actions.state.profile || {};
      return { ...state };
    case UPDATE_SESSION:
      const { entity } = actions;
      return {
        ...state,
        entity: entity,
        organisation: (entity && entity.organisation) || null,
        person: (entity && entity.person) || null,
        access_token: actions.access_token,
      };
    case LOADING_PROFILE:
      return {
        ...state,
        loading: actions.loading === true,
      };
    default:
      return state;
  };
}

export default profile_reducer;

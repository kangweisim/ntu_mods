import { INIT } from "../action_types";
import * as EnvActions from "./env.actions";
import * as ModelsActions from "./models.actions";
import * as ProfileActions from "./profile.actions";
import * as FilterActions from "./filter.actions";

export function init(saved_state = {}) {
  return {
    state: saved_state,
    type: INIT
  }
}
export { EnvActions, ProfileActions, ModelsActions, FilterActions };
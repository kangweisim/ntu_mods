import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import * as actions from "./actions";
import reducers from "./reducers";
import { constants } from "app/utils";


const logger = createLogger();
const middlewares = [
  thunk,
  logger
];

export { actions };
export const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(...middlewares)
));

const { KEY_LOCAL_SAVE } = constants;

let saved_state = undefined;
try {
  saved_state = localStorage.getItem(KEY_LOCAL_SAVE);
  saved_state = JSON.parse(saved_state) || {};
  store.dispatch(actions.init(saved_state));
} catch (e) {
  console.log(`error while trying to load state`, e);
};
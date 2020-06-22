import { combineReducers } from "redux";
import profile from "./profile.reducer";
import models from "./models.reducer";
import localstore from "./localstore.reducer";
import env from "./env.reducer";
import filters from "./filters.reducer";

export default combineReducers({
  profile,
  localstore,
  models,
  env,
  filters
});

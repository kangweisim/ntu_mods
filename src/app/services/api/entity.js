import { get_api_path } from "./api";
import { store } from "app/store";
import { sessioned_client } from "./auth";

export async function all_roles() {
  const url = get_api_path("privilege/roles");
  const { token } = store.getState().profile;
  const response = await sessioned_client(token).get(url);
  const { models } = response.data.result;
  return { models };
};

export async function all_projects() {
  const url = get_api_path("privilege/projects");
  const { token } = store.getState().profile;
  const response = await sessioned_client(token).get(url);
  const { models } = response.data.result;
  return { models };
};

export async function update_privilege(privilege_id, data) {
  const url = get_api_path("user/privilege/update", {}, { privilege_id });
  const { token } = store.getState().profile;
  const response = await sessioned_client(token).post(url, data);
  const { model } = response.data.result;
  return { model };
};

export async function roles(entity_id, data) {
  const url = get_api_path("admin/entity/roles", {}, { entity_id });
  const { token } = store.getState().profile;
  const response = await sessioned_client(token).post(url, data);
  const { model } = response.data.result;
  return { model };
};
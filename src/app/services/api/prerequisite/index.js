import { get_api_path } from "../api";
import { axios } from "app/utils";

export async function list({ query }) {
  const url = get_api_path("prerequisite/list");
  const response = await axios.get(url, {
    params: query
  });
  const { models, meta } = response.data.result;
  return { models, meta };
};
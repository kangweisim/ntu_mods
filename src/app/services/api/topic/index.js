import { get_api_path } from "../api";
import { axios } from "app/utils";

export async function list({ query }) {
  const url = get_api_path("topic/list");
  const response = await axios.get(url, {
    params: query
  });
  const { models, meta } = response.data.result;
  return { models, meta };
};


export async function detail(topicId) {
  const url = get_api_path("topic/detail", {}, { topicId });
  const response = await axios.get(url);
  return response.data.result;
};
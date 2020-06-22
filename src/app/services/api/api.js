import querystring from "querystring";

const API_HOST = process.env.REACT_APP_API_HOST;
const PATHS = {};

PATHS["module/list"] = "/module/list"; // GET
PATHS["module/detail"] = "/module/:moduleId/detail"; // GET

PATHS["topic/list"] = "/topic/list"; // GET
PATHS["topic/detail"] = "/topic/:topicId/detail"; // GET

PATHS["prerequisite/list"] = "/prerequisite/list"; // GET

export function get_api_path(key, query_params, route_params = {}) {
  const prefix = API_HOST;

  let url = prefix + PATHS[key];
  // eslint-disable-next-line no-unused-vars
  for (const paramKey in route_params)
    url = url.replace(`:${paramKey}`, route_params[paramKey]);

  if (query_params)
    url += "?" + querystring.stringify(query_params);
  return url;
};
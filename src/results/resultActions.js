import http from "../http";

export function getResults(taskID, limit = 100, offset = 100) {
  return (_, getState) => {
    const { apiURL } = getState().config;
    return http.get(`${apiURL}/api/v1/results&task=${taskID}&limit=${limit}&offset=${offset}`);
  };
}

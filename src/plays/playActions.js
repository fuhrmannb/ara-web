import http from "../http";

export function getPlays(playbookID, limit = 100, offset = 100) {
  return (_, getState) => {
    const { apiURL } = getState().config;
    return http.get(`${apiURL}/api/v1/plays?&playbook=${playbookID}&limit=${limit}&offset=${offset}`);
  };
}

import http from "../http";
import * as types from "./playbooksActionsTypes";

export function fetchPlaybooks(page = 1, perPage = 100) {
  return async (dispatch, getState) => {
    const { apiURL } = getState().config;
    const offset = (page - 1) * perPage
    const response = await http.get(`${apiURL}/api/v1/playbooks?limit=${perPage}&offset=${offset}`);
    dispatch({
      type: types.FETCH_PLAYBOOKS,
      count: response.data.count,
      page: page,
      perPage: perPage,
      playbooks: response.data.results,
    });
    return response;
  };
}

export function fetchPlaybook(playbookID) {
  return async (dispatch, getState) => {
    const { apiURL } = getState().config;
    const response = await http.get(`${apiURL}/api/v1/playbooks/${playbookID}`);
    dispatch({
      type: types.FETCH_PLAYBOOK,
      playbook: response.data,
    });
    return response;
  };
}

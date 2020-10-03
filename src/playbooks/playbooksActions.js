import http from "../http";
import * as types from "./playbooksActionsTypes";

export function getPlaybooks() {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return http.get(`${apiURL}/api/v1/playbooks`).then((response) => {
      dispatch({
        type: types.FETCH_PLAYBOOKS,
        playbooks: response.data.results,
      });
      return response;
    });
  };
}

export function getPlaybook(playbook) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return http.get(`${apiURL}/api/v1/playbooks/${playbook.id}`);
  };
}

export function getPlaybookHosts(playbook) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return http.get(`${apiURL}/api/v1/hosts?limit=999999999&playbook=${playbook.id}&`);
  };
}

export function getPlaybookPlays(playbook) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return http.get(`${apiURL}/api/v1/plays?limit=999999999&playbook=${playbook.id}`);
  };
}

export function getPlaybookTasks(playbook) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return http.get(`${apiURL}/api/v1/tasks?limit=999999999&playbook=${playbook.id}`);
  };
}

export function getPlaybookResults(playbook) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return http.get(`${apiURL}/api/v1/results?limit=999999999&playbook=${playbook.id}`);
  };
}

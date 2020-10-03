import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import configReducer from "./config/configReducer";
import playbooksReducer from "./playbooks/playbooksReducer";
import authReducer from "./auth/authReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    config: configReducer,
    playbooks: playbooksReducer,
    // playbook: playbookReducer,
    // hosts: hostsReducer,
    // plays: playsReducer,
    // results: resultsReducer,
    auth: authReducer,
  }),
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;

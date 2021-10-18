import { createStore } from "redux";
import { rootReducer } from "../reducer/appSlice";
import { listUserReducer, getList,roomReducer } from "../reducer/chat";
import {
  loggedReducer,
  loggedStateReducer,
  getUser,

} from "../reducer/isLogged";
import { combineReducers } from "redux";

const CombineReducer = combineReducers({
  rootReducer,
  loggedReducer,
  loggedStateReducer,
  getUser,
  getList,
  listUserReducer,
  roomReducer
});

export default createStore(
  CombineReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import {combineReducers, createStore} from "redux";
import {userReducer} from "../userReducer";

const rootReducer = combineReducers({
  setUser: userReducer,
})

export const store = createStore(rootReducer)
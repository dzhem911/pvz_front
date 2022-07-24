import {applyMiddleware, combineReducers, createStore} from "redux";
import {userReducer} from "../userReducer";
import thunk from "redux-thunk";
import {loaderReducer} from "../loaderReducer";

const rootReducer = combineReducers({
  setUser: userReducer,
  loader: loaderReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
import {applyMiddleware, combineReducers, createStore} from "redux";
import {userReducer} from "../userReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  setUser: userReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
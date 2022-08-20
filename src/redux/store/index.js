import {applyMiddleware, combineReducers, createStore} from "redux";
import {userReducer} from "../userReducer";
import thunk from "redux-thunk";
import {loaderReducer} from "../loaderReducer";
import {modalReducer} from "../modalsReducer";

const rootReducer = combineReducers({
  setUser: userReducer,
  loader: loaderReducer,
  modal: modalReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
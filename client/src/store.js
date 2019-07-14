import { createStore, applyMiddleware } from "redux";
import opinionReducers from "./reducers";
import thunk from "redux-thunk";

const store = createStore(opinionReducers, applyMiddleware(thunk));

export default store;
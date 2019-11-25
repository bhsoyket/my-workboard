import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middlewareList = [thunk];

const middleware = composeWithDevTools(applyMiddleware(...middlewareList));

export default middleware;

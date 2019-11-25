import { createStore } from "redux";
import rootReducer from "./reducer";
import middleware from "./middleware";

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, middleware);
}

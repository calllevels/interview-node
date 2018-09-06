import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import currenciesReducer from "./reducers/currenciesReducer";
import modalsReducer from "./reducers/modalsReducer";

const reducers = combineReducers({
  currenciesReducer,
  modalsReducer
});

const enhancers = [];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers
);
const Store = createStore(reducers, compose(composedEnhancers));

export default Store;

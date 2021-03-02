import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers";

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

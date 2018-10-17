import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import {
  RootAction,
  rootEpic,
  rootReducer,
  RootState
} from "./modules/modulesRoot";

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
};

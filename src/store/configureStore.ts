import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import {
  RootAction,
  rootEpic,
  rootReducer,
  RootState
} from "./modules/modulesRoot";
import { services } from "../services/servicesRoot";

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>({
  dependencies: services
});

const getMiddleware = () => {
  const middleware = [];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middleware.push(logger);
  }

  middleware.push(epicMiddleware);

  return middleware;
};

export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(...getMiddleware()));

  epicMiddleware.run(rootEpic);

  return store;
};

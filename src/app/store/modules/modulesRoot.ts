import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { AuthAction, authReducer } from "./auth/authReducer";
import { combineEpics } from "redux-observable";
import { authEpics } from "./auth/authEpics";

export const rootReducer = combineReducers({
  auth: authReducer
});

export const rootEpic = combineEpics(authEpics);

export type RootState = StateType<typeof rootReducer>;

export type RootAction = AuthAction; // union other action types here when there are some

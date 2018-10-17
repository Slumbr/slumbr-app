import { ActionType, getType } from "typesafe-actions";

import * as authActions from "./authActions";
import { Google } from "expo";
import LogInResult = Google.LogInResult;
export type AuthAction = ActionType<typeof authActions>;

export interface AuthState {
  isGooglePending: boolean;
  isGoogleCancelled: boolean;
  googleError?: Error;
  googleResult?: LogInResult;
  isSlumbrPending: boolean;
  slumbrError?: Error;
  slumbrToken?: string;
}

const initialState: AuthState = {
  isGooglePending: false,
  isGoogleCancelled: false,
  isSlumbrPending: false
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
) => {
  switch (action.type) {
    case getType(authActions.google.request):
      return {
        ...initialState,
        isGooglePending: true
      } as AuthState;
    case getType(authActions.googleCancelled):
      return {
        ...state,
        isGooglePending: false,
        isGoogleCancelled: true,
        googleError: undefined
      } as AuthState;
    case getType(authActions.google.success):
      const googleResult = action.payload;
      return {
        ...state,
        isGooglePending: false,
        googleResult,
        googleError: undefined
      } as AuthState;
    case getType(authActions.google.failure): {
      const error = action.payload;
      return {
        ...state,
        isGooglePending: false,
        googleResult: undefined,
        error
      } as AuthState;
    }
    case getType(authActions.server.request):
      return {
        ...state,
        isSlumbrPending: true
      } as AuthState;
    case getType(authActions.server.success):
      const slumbrToken = action.payload;
      return {
        ...state,
        isSlumbrPending: false,
        slumbrToken,
        slumbrError: undefined
      } as AuthState;
    case getType(authActions.server.failure): {
      const error = action.payload;
      return {
        ...state,
        isGooglePending: false,
        googleResult: undefined,
        error
      } as AuthState;
    }
    default:
      return state;
  }
};

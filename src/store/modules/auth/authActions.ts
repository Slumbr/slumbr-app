import { action, createAsyncAction } from "typesafe-actions";
import { Google } from "expo";

export const google = createAsyncAction(
  "auth/GOOGLE_REQUESTED",
  "auth/GOOGLE_SUCCEEDED",
  "auth/GOOGLE_FAILED"
)<void, Google.LogInResult, Error>();

export const googleCancelled = () => action("auth/GOOGLE_CANCELLED");

export const server = createAsyncAction(
  "auth/SERVER_REQUESTED",
  "auth/SERVER_SUCCEEDED",
  "auth/SERVER_FAILED"
)<void, string, Error>();

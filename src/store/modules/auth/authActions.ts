import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { Google } from "expo";

export const existingToken = createAsyncAction(
  "auth/EXISTING_TOKEN_REQUESTED",
  "auth/EXISTING_TOKEN_SUCCESS",
  "auth/EXISTING_TOKEN_FAILED"
)<void, string | null, Error>(); // TODO this was a weird choice, maybe error could be no token?

export const google = createAsyncAction(
  "auth/GOOGLE_REQUESTED",
  "auth/GOOGLE_SUCCEEDED",
  "auth/GOOGLE_FAILED"
)<void, Google.LogInResult, Error>();

export const googleCancelled = createStandardAction("auth/GOOGLE_CANCELLED")<
  void
>();

export const server = createAsyncAction(
  "auth/SERVER_REQUESTED",
  "auth/SERVER_SUCCEEDED",
  "auth/SERVER_FAILED"
)<void, string, Error>();

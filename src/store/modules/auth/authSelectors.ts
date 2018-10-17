import { RootState } from "../modulesRoot";
import { createSelector } from "reselect";

export const selectAuthRoot = (state: RootState) => state.auth;

export const selectGoogleAuthToken = createSelector(
  selectAuthRoot,
  ({ googleResult }) => {
    return googleResult && googleResult.type === "success"
      ? googleResult.accessToken
      : undefined;
  }
);

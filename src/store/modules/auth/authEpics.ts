import { Services } from "../../../services/servicesRoot";
import { RootAction, RootState } from "../modulesRoot";
import { from, of } from "rxjs";
import { catchError, filter, map, mapTo, switchMap } from "rxjs/operators";
import { combineEpics, Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { google, googleCancelled, server } from "./authActions";
import { selectGoogleAuthToken } from "./authSelectors";

const googleAuthEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  _,
  { auth: { googleLogin } }
) =>
  action$.pipe(
    filter(isActionOf(google.request)),
    switchMap(_ =>
      from(googleLogin()).pipe(
        map(
          result =>
            result.type === "cancel"
              ? googleCancelled()
              : google.success(result)
        ),
        catchError(error => of(google.failure(error)))
      )
    )
  );

const checkGoogleTokenWithServerEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = action$ =>
  action$.pipe(
    filter(isActionOf(google.success)),
    mapTo(server.request())
  );

// TODO needs to check with server
const googleServerAuthEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state, { auth: { checkGoogleToken } }) =>
  action$.pipe(
    filter(isActionOf(server.request)),
    switchMap(_ => {
      const googleAuthToken = selectGoogleAuthToken(state.value);

      if (!googleAuthToken) {
        return of(server.failure(new Error("no token")));
      }

      return from(checkGoogleToken(googleAuthToken)).pipe(
        map(slumbrToken => server.success(slumbrToken)),
        catchError(error => of(google.failure(error)))
      );
    })
  );

export const authEpics = combineEpics(
  googleAuthEpic,
  checkGoogleTokenWithServerEpic,
  googleServerAuthEpic
);

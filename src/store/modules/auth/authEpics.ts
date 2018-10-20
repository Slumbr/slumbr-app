import { Services } from "../../../services/servicesRoot";
import { RootAction, RootState } from "../modulesRoot";
import { from, of } from "rxjs";
import { catchError, filter, map, mapTo, switchMap, tap } from "rxjs/operators";
import { combineEpics, Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { existingToken, google, googleCancelled, server } from "./authActions";
import { selectGoogleAuthToken } from "./authSelectors";
import { EMPTY } from "rxjs";

const loadExistingTokenAndNavigateToAppOrSignIn: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (
  action$,
  _,
  { auth: { getAuthTokenFromLocalStorage }, navigation: { navigate } }
) =>
  action$.pipe(
    filter(isActionOf(existingToken.request)),
    switchMap(_ => {
      console.log("action");
      return from(getAuthTokenFromLocalStorage()).pipe(
        map(token => {
          if (token) {
            navigate("Main");
          } else {
            navigate("Auth");
          }
          return existingToken.success(token);
        })
      );
    })
  );

// TODO could flatten this
const googleAuthEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  _,
  { auth: { googleLogin } }
) =>
  action$.pipe(
    filter(isActionOf(google.request)),
    tap(x => console.log("got here", x)),
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

const navigateToMainAfterSuccessfulLogin: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, _, { navigation: { navigate } }) =>
  action$.pipe(
    filter(isActionOf(server.success)),
    switchMap(_ => {
      navigate("Main");
      return EMPTY;
    })
  );

export const authEpics = combineEpics(
  loadExistingTokenAndNavigateToAppOrSignIn,
  googleAuthEpic,
  checkGoogleTokenWithServerEpic,
  googleServerAuthEpic,
  navigateToMainAfterSuccessfulLogin
);

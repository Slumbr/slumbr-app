import { AuthSession } from "expo";

import { googleOAuth } from "../../secrets";
// import LogInResult = Google.LogInResult;
import { get, set } from "../localStorage/localStorageService";

export const googleLogin = async (): Promise<AuthSession.StartAsyncResponse | null> => {
  console.log("googleOAuth", googleOAuth);

  const GOOGLE_WEB_APP_ID = googleOAuth.androidClientId;

  // return {
  //   type: "success",
  //   accessToken: "fakeToken",
  //   user: {
  //     id: "1",
  //     name: "fake",
  //     givenName: "fake",
  //     familyName: "fake"
  //   }
  // };

  let redirectUrl = AuthSession.getRedirectUrl();
  console.log("rediectUrl", redirectUrl);
  const response = await AuthSession.startAsync({
    authUrl:
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `&client_id=${GOOGLE_WEB_APP_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&response_type=code` +
      `&access_type=offline` +
      `&prompt=consent` +
      `&scope=${encodeURIComponent(
        "https://www.googleapis.com/auth/plus.profile.emails.read"
      )}`
  });

  console.log("response", response);

  return null;

  //
  // return Google.logInAsync({
  //   ...googleOAuth,
  //   scopes: ["profile", "email"]
  // });
};

export const checkGoogleToken = async (googleToken: string) => {
  // TODO should check this with the server
  return "slumbr token 123 " + googleToken;
};

export const getAuthTokenFromLocalStorage = async () => {
  try {
    console.log("before asyn get item");
    const token = await get("userToken");
    console.log("token", token);
    return null; // TODO this is just for testing
    // return token;
  } catch (error) {
    console.log("async token error", error);
    return null;
  }
};

export const setAuthTokenInLocalStorage = async (slmbrToken: string) => {
  await set("userToken", slmbrToken);
};

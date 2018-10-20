import { Google } from "expo";

import { googleOAuth } from "../../secrets";
import LogInResult = Google.LogInResult;
import { get, set } from "../localStorage/localStorageService";

export const googleLogin = async (): Promise<LogInResult> => {
  console.log("googleOAuth", googleOAuth);

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

  return Google.logInAsync({
    ...googleOAuth,
    scopes: ["profile", "email"]
  });
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

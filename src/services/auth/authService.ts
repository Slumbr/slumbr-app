import { Google } from "expo";

import { googleOAuth } from "../../../secrets.json";

export const googleLogin = () => {
  return Google.logInAsync({
    ...googleOAuth,
    scopes: ["profile", "email"]
  });
};

export const checkGoogleToken = async (googleToken: string) => {
  return googleToken;
};

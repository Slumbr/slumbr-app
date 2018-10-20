import * as authServices from "./auth/authService";
import * as navigationServices from "./navigation/navigationService";

export const services = {
  auth: authServices,
  navigation: navigationServices
};

export type Services = typeof services;

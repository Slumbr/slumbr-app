import * as authServices from "./auth/authService";

export const services = {
  auth: authServices
};

export type Services = typeof services;

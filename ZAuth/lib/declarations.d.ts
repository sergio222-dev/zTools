import {AuthService} from "./AuthService";

declare global {
  interface Window {
    ZAuth: AuthService | null;
  }
}


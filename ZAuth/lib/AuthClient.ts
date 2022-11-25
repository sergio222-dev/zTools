import {Auth} from "firebase/auth";

export type User = {
  displayName: string;
  email: string;
  avatar: string;
};
export type UserCredentials = {};
export type CallbackAuthChanged = (user: User | null) => void;

export interface AuthClient {
  onAuthStateChanged(callback: CallbackAuthChanged): void;
  signInGithub(): Promise<UserCredentials>;
  signOut(): Promise<void>;
  getUser(): User | null
  getAuth(): Auth
}

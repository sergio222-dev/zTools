type User = {};
export type UserCredentials = {};
export type CallbackAuthChanged = (user: User) => void;

export interface AuthClient {
  onAuthStateChanged(callback: CallbackAuthChanged): void;
  signInGithub(): Promise<UserCredentials>;
  signOut(): Promise<void>;
}

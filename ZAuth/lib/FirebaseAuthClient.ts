import {initializeApp, FirebaseOptions, FirebaseApp} from "firebase/app";
import {Auth, getAuth, GithubAuthProvider, signInWithPopup} from "firebase/auth";
import {AuthClient, CallbackAuthChanged, UserCredentials} from "./AuthClient";

export class FirebaseAuthClient implements AuthClient {
  private readonly client: FirebaseApp;
  private readonly authClient: Auth;

  constructor(options: FirebaseOptions) {
    this.client = initializeApp(options);
    this.authClient = getAuth(this.client);
  }

  onAuthStateChanged(callback: CallbackAuthChanged): void {
    this.authClient.onAuthStateChanged((user) => {
      callback(user);
    })
  }

  async signInGithub(): Promise<UserCredentials> {
    const githubProvider = new GithubAuthProvider();
    return await signInWithPopup(this.authClient, githubProvider);
  }

  async signOut() {
    await this.authClient.signOut();
  }

  async getUser() {
    return this.authClient.currentUser;
  }
}

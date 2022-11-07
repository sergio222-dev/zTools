import {initializeApp, FirebaseOptions, FirebaseApp} from "firebase/app";
import {Auth, getAuth, GithubAuthProvider, signInWithPopup} from "firebase/auth";
import {AuthClient, CallbackAuthChanged, User, UserCredentials} from "./AuthClient";

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

  /**
   * @description Get user, have to wait to load
   */
  getUser(): User {
    return this.authClient.currentUser as User;
  }

  getAuth(): Auth {
    return this.authClient;
  }
}

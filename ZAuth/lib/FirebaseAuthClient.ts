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
    this.authClient.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }

      const user: User = {
        avatar: firebaseUser.photoURL ?? '',
        displayName: firebaseUser.displayName ?? '',
        email: firebaseUser.email ?? '',
      };

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
    const currentUser = this.authClient.currentUser;
    // return this.authClient.currentUser as User;
    return {
      email: currentUser?.email ?? '',
      displayName: currentUser?.displayName ?? '',
      avatar: currentUser?.photoURL ?? ''
    }
  }

  getAuth(): Auth {
    return this.authClient;
  }
}

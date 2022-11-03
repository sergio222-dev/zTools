import { injectable } from "inversify";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export interface IAuthService {}

// @ts-ignore
@injectable()
export default class AuthService implements IAuthService {
  private readonly client: Auth;

  constructor() {

    // firebase config
    // const firebaseConfig = {
    //   apiKey: import.meta.env.VITE_MF_FIREBASE_API_KEY,
    //   authDomain: import.meta.env.VITE_MF_FIREBASE_AUTH_DOMAIN,
    //   projectId: import.meta.env.VITE_MF_FIREBASE_PROJECT_ID,
    //   storageBucket: import.meta.env.VITE_MF_FIREBASE_STORAGEBUCKET,
    //   messagingSenderId: import.meta.env.VITE_MF_FIREBASE_MESSAGINGSENDERID,
    //   appId: import.meta.env.VITE_MF_FIREBASE_APP_ID,
    // };

    // console.log("QXC firebase config", firebaseConfig);

    // const app = initializeApp(firebaseConfig);

    this.client = getAuth()

    // onAuthStateChanged(this.client, (user) => {
    //   console.log("user", user)
    // })
  }

  async signInWithProvider(): Promise<void> {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(this.client, provider);

    console.log(result);
  }

  async signOut(): Promise<void> {
    await signOut(this.client);
  }
}

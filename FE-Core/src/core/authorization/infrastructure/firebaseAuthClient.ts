import { AuthClient, User } from "../application/auth.service";
import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;

export class FirebaseAuthClient implements AuthClient {

  private readonly authClient: Auth;

  constructor() {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_MF_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_MF_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_MF_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_MF_FIREBASE_STORAGEBUCKET,
      messagingSenderId: import.meta.env.VITE_MF_FIREBASE_MESSAGINGSENDERID,
      appId: import.meta.env.VITE_MF_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);

    this.authClient = getAuth(app);
  }

  isUserLoggedIn(): boolean {
    // const auth = getAuth();
    //
    // return !!auth.currentUser;
    return false;
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    console.log("QXC log changed");
    onAuthStateChanged(this.authClient, (user) => {
      callback(user);
    });
  }
}

import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
export class FirebaseAuthClient {
    client;
    authClient;
    constructor(options) {
        this.client = initializeApp(options);
        this.authClient = getAuth(this.client);
    }
    onAuthStateChanged(callback) {
        this.authClient.onAuthStateChanged((user) => {
            callback(user);
        });
    }
    async signInGithub() {
        const githubProvider = new GithubAuthProvider();
        return await signInWithPopup(this.authClient, githubProvider);
    }
    async signOut() {
        await this.authClient.signOut();
    }
}

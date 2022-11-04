export interface AuthClient {
  isUserLoggedIn(): boolean;
  onAuthStateChanged(callback: (user: User | null) => void): void;
}

export interface User {

}

export class BasicAuthService {

  constructor(private authClient: AuthClient) {
  }

  isUserLoggedIn(): boolean {
    return this.authClient.isUserLoggedIn();
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    this.authClient.onAuthStateChanged(callback);
  }

}

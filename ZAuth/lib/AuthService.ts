import {AuthClient} from "./AuthClient";

export class AuthService {

  private static instance: AuthService | null = null;
  private static client: AuthClient | null = null;

  private constructor() {
  }

  static setInstance(client: AuthClient) {
    AuthService.client = client;
  }

  static getClient(): AuthService {
    if (AuthService.client === null) throw new Error("A client auth method should be setted before initialize an instance");
    if (AuthService.instance !== null) return AuthService.instance;

    this.instance = new AuthService();
    return this.instance;
  }

}

import {AuthClient} from "./AuthClient";

export class AuthService {
  private client: AuthClient | null = null;

  private constructor() {
  }

  setClient(client: AuthClient) {
    this.client = client;
  }

  static getInstance(): AuthService {
    if (window.ZAuth !== null) return window.ZAuth;
    window.ZAuth = new AuthService();

    return window.ZAuth;
  }

  getClient(): AuthClient {
    this.validateClient();
    return this.client as AuthClient;
  }

  private isClientCreated(): boolean {
    return this.client !== null;
  }

  private validateClient(): void {
    if (!this.isClientCreated()) throw new Error("A client auth method should be set before initialize an instance");
  }

}

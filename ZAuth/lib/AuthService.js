export class AuthService {
    static instance = null;
    static client = null;
    constructor() {
    }
    static setInstance(client) {
        AuthService.client = client;
    }
    static getClient() {
        if (AuthService.client === null)
            throw new Error("A client auth method should be setted before initialize an instance");
        if (AuthService.instance !== null)
            return AuthService.instance;
        this.instance = new AuthService();
        return this.instance;
    }
}

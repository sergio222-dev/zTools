import "@abraham/reflection";
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html?raw";
import { FirebaseAuthClient, AuthService } from "zauth-utility-module";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) =>
    import(
      /* @vite-ignore */
      // @ts-ignore
      name
      )
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

// Authorization initialization
const firebaseConfig = {
  apiKey: import.meta.env.VITE_MF_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_MF_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_MF_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_MF_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MF_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_MF_FIREBASE_APP_ID
};

const authClient = new FirebaseAuthClient(firebaseConfig);

console.log("auth", AuthService);

const instance = AuthService.getInstance();
instance.setClient(authClient);
console.log("this is only exec once");

authClient.onAuthStateChanged((user) => {
  // // TODO route should be in a config
  if (!user && window.location.pathname === "/login") return;
  if (user && window.location.pathname !== "/login") return;
  if (!user && window.location.pathname !== "/login") {
    const origin = window.location.origin;
    // // TODO route should be in a config
    window.location.replace(origin + "/login");
  }
});



// const auth = AuthService.getClient();


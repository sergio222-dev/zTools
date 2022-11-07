import "@abraham/reflection";
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html?raw";
import { FirebaseAuthClient, AuthService } from "zauth-utility-module";

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

authClient.getUser()
  .then(user => {
    // redirect on not login
    if (!user && window.location.pathname !== '/login') {
      // TODO route should be in a config
      console.log("user", user)
      const origin = window.location.origin;
      // window.location.replace(origin + "/login");
    }

    // redirect on login
    if (user && window.location.pathname === "/login") {
      const origin = window.location.origin;
      window.location.replace(origin + "/");
    }
  });

// share the client between all instance
const instance = AuthService.getInstance();
instance.setClient(authClient);


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

authClient.onAuthStateChanged((user) => {
  // TODO route should be in a config
  if (!user && window.location.pathname === "/login") return;
  if (user && window.location.pathname !== "/login") return;
  if (user && window.location.pathname === "/login") {
    const origin = window.location.origin;
    window.location.replace(origin + "/");
  }
  if (!user && window.location.pathname !== "/login") {
    const origin = window.location.origin;
    window.location.replace(origin + "/login");
  }
});


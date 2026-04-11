import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
// ..custom
import App from "@/App";
import "@/index.css";
import { StrictMode } from "react";
import { VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT, VIT_AUTH0_AUDIENCE } from "@/util/envConfig";

// ..auth0 config
const domain: string = VITE_AUTH0_DOMAIN;
const clientId: string = VITE_AUTH0_CLIENT;
const audience: string = VIT_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience,
        scope: "openid profile email",
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);

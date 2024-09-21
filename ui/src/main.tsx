import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import { store } from "@/common/state/store";
// ..custom
import App from './App.tsx';
import './index.css'

// read env variables
const domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId: string = import.meta.env.VITE_AUTH0_CLIENT;
const audience: string = import.meta.env.VITE_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>    
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience,
        scope: "openid profile email",
      }}>
      <App />    
      </Auth0Provider>
  </Provider>
)

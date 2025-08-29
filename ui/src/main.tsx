import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/common/state/store';
import { Auth0Provider } from "@auth0/auth0-react";
// ..custom
import App from '@/App';
import '@/index.css';
import { StrictMode } from 'react';

// ..auth0 config
const domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId: string = import.meta.env.VITE_AUTH0_CLIENT;
const audience: string = import.meta.env.VITE_AUTH0_AUDIENCE;


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience,
        scope: "openid profile email",
      }}>
      <Provider store={store}>

        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>
);

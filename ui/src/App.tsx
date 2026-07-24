import { ScrollToTop } from "@/components/scroll-to-top";

import { PageTransition } from "@/components/PageTransition"; 


import { Fragment, useEffect, useCallback } from "react";
import { HashRouter } from "react-router-dom";

import { ThemeToggler } from "@/components/ThemeToggler";
import { Toaster } from "@/components/ui/toaster";
import { Theme, useTheme } from "react-daisyui";
import { useAuth0 } from "@auth0/auth0-react";
//..custom
import ClientRouter from "@/router/ClientRouter";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { VIT_AUTH0_AUDIENCE } from "@/util/envConfig";

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const audience: string = VIT_AUTH0_AUDIENCE;
  const { theme } = useTheme();
  const { setUserDetails, setToken, fetchUserAdminDetailsAPI } = useAuthStore();

  const checkUserDetails = useCallback(async () => {
    if (!isAuthenticated) return;
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience,
        scope: "openid profile email",
      },
    });
    setUserDetails({
      name: user.name,
      email: user.email,
      profilePic: user.picture,
    });
    if (accessToken) {
      setToken(accessToken);
      fetchUserAdminDetailsAPI({ token: accessToken as string });
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    checkUserDetails();
  }, [isAuthenticated]);

  return (
  <Fragment>
    <Theme dataTheme={theme}>
      <HashRouter>
  <PageTransition />

  <ClientRouter />
  <Toaster />
  <ThemeToggler />
</HashRouter>
    </Theme>
  </Fragment>
);
}

export default App;

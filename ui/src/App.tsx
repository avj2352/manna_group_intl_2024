import { Fragment, useEffect, useCallback } from "react";
import { HashRouter } from "react-router-dom";
import { Footer } from "@/components/navigation/Footer";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Toaster } from "@/components/ui/toaster"
import { Theme, useTheme } from "react-daisyui";
import { useAuth0 } from "@auth0/auth0-react";
//..custom
import Navbar from "@/components/navigation/public/Navbar";
import ClientRouter from "@/router/ClientRouter";
import { navList } from "@/components/navigation/public/navigation.list";
import { useAppDispatch } from "@/common/state/store";
import { fetchUserAdminDetailsAPI, setUserDetails, setToken } from "@/common/state/features/auth/auth.slice";

function App() {
  // ..states
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const audience: string = import.meta.env.VITE_AUTH0_AUDIENCE;
  const { theme } = useTheme();
  // ..actions / evt handlers
  const dispatch = useAppDispatch();

  // lifecycle
  const checkUserDetails = useCallback(async () => {
    if (!isAuthenticated) return;    
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience,
        scope: "openid profile email",
      },
    });
    dispatch(
      setUserDetails({
        name: user.name,
        email: user.email,
        profilePic: user.picture,
      })
    );
    if (accessToken) {
      dispatch(setToken(accessToken));
      dispatch(fetchUserAdminDetailsAPI({token: accessToken as string}));
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    checkUserDetails();
  }, [isAuthenticated]);

  return (
    <Fragment>
      <Theme dataTheme={theme}>
        <HashRouter>
          <ClientRouter />
          <Toaster/>
          <ThemeToggler />
          <Footer navList={navList} />
        </HashRouter>
      </Theme>
    </Fragment>
  );
}

export default App;

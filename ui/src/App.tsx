import { Fragment, useEffect, useCallback } from "react";
import { HashRouter } from "react-router-dom";
import { Footer } from "@/components/navigation/Footer";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Theme, useTheme } from "react-daisyui";
import { useAuth0 } from "@auth0/auth0-react";
//..custom
import Navbar from "@/components/navigation/Navbar";
import ClientRouter from "@/router/ClientRouter";
import { navList } from "@/components/navigation/navigation.list";
import { useAppDispatch } from "@/common/state/store";
import { fetchUserAdminDetailsAPI, setUserDetails } from "@/common/state/features/auth/auth.slice";

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
    console.log("User details is: ", user);
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
    console.log("Access Token is: ", accessToken);
    if (accessToken) dispatch(fetchUserAdminDetailsAPI({token: accessToken as string}));
  }, [getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    checkUserDetails();
  }, [isAuthenticated]);

  return (
    <Fragment>
      <Theme dataTheme={theme}>
        <HashRouter>
          <Navbar navList={navList} />
          <ClientRouter />
          <ThemeToggler />
          <Footer navList={navList} />
        </HashRouter>
      </Theme>
    </Fragment>
  );
}

export default App;

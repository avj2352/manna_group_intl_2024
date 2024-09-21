import { Fragment, useEffect, useCallback } from "react";
import { HashRouter } from "react-router-dom";
import { Footer } from "@/components/navigation/Footer";
import { ThemeToggler } from "@/components/ThemeToggler.tsx";
import { Theme, useTheme } from "react-daisyui";
import { useAuth0 } from "@auth0/auth0-react";
//..custom
import Navbar from "./components/navigation/Navbar";
import ClientRouter from "./router/ClientRouter";
import { navList } from "./components/navigation/navigation.list";

function App() {
  const { user, isAuthenticated, getAccessTokenSilently} = useAuth0();
  const audience: string = import.meta.env.VITE_AUTH0_AUDIENCE;

  const { theme } = useTheme();

  // lifecycle
  const checkUserDetails = useCallback(async () => {
    if (!isAuthenticated) return;
    console.log('User details is: ', user);        
    const accessToken = await getAccessTokenSilently({
        authorizationParams: {
            audience,
            scope: "openid profile email"
        }
    });
    console.log('Access Token is: ', accessToken);
  }, [getAccessTokenSilently, isAuthenticated, user]);

useEffect(() => {
  checkUserDetails();
},[isAuthenticated]);


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

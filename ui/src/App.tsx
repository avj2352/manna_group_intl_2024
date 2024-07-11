import { Fragment } from "react";
import { HashRouter } from "react-router-dom";
import { Footer } from "@/components/navigation/Footer";
import { ThemeToggler } from "@/components/ThemeToggler.tsx";
import { Theme, useTheme } from "react-daisyui";
import Navbar from "./components/navigation/Navbar";
import ClientRouter from "./router/ClientRouter";
import { navList } from "./components/navigation/navigation.list";

function App() {
  const { theme } = useTheme();

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

import { Fragment } from "react";
import { HashRouter } from "react-router-dom";
import { Footer } from "@/components/Footer.tsx";
import { ThemeToggler } from "@/components/ThemeToggler.tsx";
import { Theme, useTheme } from "react-daisyui";
import Navbar from "./components/Navbar";
import ClientRouter from "./router/ClientRouter";

function App() {
  const { theme } = useTheme();

  return (
    <Fragment>
      <Theme dataTheme={theme}>
        <Navbar />
        <HashRouter>
          <ClientRouter />
        </HashRouter>
        <Footer />
        <ThemeToggler />
      </Theme>
    </Fragment>
  );
}

export default App;

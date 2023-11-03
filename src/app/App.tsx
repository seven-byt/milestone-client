import { Routing } from "../pages";
import { withProviders } from "./providers";

import "./App.module.scss";
import "./App.scss";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return <Routing />;
};

export default withProviders(App);

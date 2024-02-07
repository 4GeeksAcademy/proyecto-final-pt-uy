//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

import { UserContextProvider, useUserContext } from "./contexts/userContext.js";
import { AnimalsContextProvider } from "./contexts/animalsContext.js";

//include your index.scss file into the bundle
import "bootstrap/dist/js/bootstrap.js";
import "../styles/custom.css";
import "../styles/index.css";

//import your own components
import App from "./app";

//render your react application
ReactDOM.render(
    <React.StrictMode>
      <UserContextProvider>
        <AnimalsContextProvider>
            <App />
        </AnimalsContextProvider>
      </UserContextProvider>
    </React.StrictMode>,
    document.getElementById("app")
  );

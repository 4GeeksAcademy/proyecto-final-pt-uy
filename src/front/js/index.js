//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/custom.css";
import "../styles/index.css";

//import your own components
import App from "./app";
import Layout from "./layout";

//render your react application
ReactDOM.render(<App />, document.querySelector("#app"));

import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./components/NavBar";
//import App from "./App";
import App from "./components/TestContainer";
//import App from "./components/App3.js";

// ReactDOM.render(
//   <React.StrictMode>
//     <NavBar />
//   </React.StrictMode>,
//   document.getElementById("navbar")
// );

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

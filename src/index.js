import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContainer from "./AppContainer";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <AppContainer expandedFolders={["VC/UnitTest", "SDK/Bootstrapper/Packages/vcredist_arm/en"]} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

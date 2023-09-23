import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "./index.scss";
import App from "./App";
// import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} defaultRating={3} /> */}
  </React.StrictMode>
);

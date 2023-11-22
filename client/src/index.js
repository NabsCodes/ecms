import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContext from './contexts/AuthContext';
import Modal from "react-modal";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>,
  document.getElementById("root")
);

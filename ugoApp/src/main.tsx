import React from "react";
import "./styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/RouterProvider";
import * as ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);

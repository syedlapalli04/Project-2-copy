import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // The root App component
    children: [
      /*
      {
        path: "/",
        element: <RecordList />,  // Display records when at the root path
      },
      */
      {
        path: "/create",
        element: <Record />,  // Edit record when at '/create'
      },
      {
        path: "/edit/:id",
        element: <Record />,  // Edit record by ID
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
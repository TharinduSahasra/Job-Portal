import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/Store.js";

// Import Pages
import Home from "./pages/Home.jsx";
import JobListings from "./pages/JobListings.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PostJob from "./pages/PostJob.jsx";
import AdminDashboardpage from "./pages/AdminDashboardpage.jsx";
import ManageUsersPage from "./pages/ManageUsersPage.jsx";  // New Manage Users Page

// Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/jobs", element: <JobListings /> },
      { path: "/login/:type", element: <Login /> },
      { path: "/register/:type", element: <Register /> },
      { path: "/postjob", element: <PostJob /> },

      // Admin Routes
      { path: "/admin/dashboard", element: <AdminDashboardpage /> },
      { path: "/admin/manage-users", element: <ManageUsersPage /> }, // New Manage Users Route
    ],
  },
]);

// Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

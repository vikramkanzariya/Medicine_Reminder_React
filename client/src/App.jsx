import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";
import MedicationList from "./components/MedicationsList";
import MedicationDetails from "./components/MedicationDetails";
import AddMedication from "./components/AddMedication";
import PrivateRoute from "./components/PrivateRoute";
import EditMedication from "./components/EditMedication";
import Reports from "./components/Reports";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "",
        element: (
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <MedicationList />
            ),
          },
          {
            path: "medications/:id",
            element: <MedicationDetails />,
          },
          {
            path: "medications/:id/edit",
            element: <EditMedication />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "add-medication",
            element: (
                <AddMedication />
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <div className="text-2xl text-center py-4">404 Page Not Found</div>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
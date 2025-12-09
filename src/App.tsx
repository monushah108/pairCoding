import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/playground";
import Profile from "./components/dashborad/Profile";
import UserMe from "./components/dashborad/userMe";
import Server from "./components/dashborad/Server";
import Authpage from "./pages/Authpage";
import { RegisterForm } from "./components/register-form";
import { LoginForm } from "./components/login-form";
import Authoptions from "./components/Authoptions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "@me",
        element: <UserMe />,
      },
      {
        path: "server",
        element: <Server />,
      },
    ],
  },
  {
    path: "/Auth",
    element: <Authpage />,
    children: [
      {
        path: "",
        element: <Authoptions />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: "/playground",
    element: <Playground />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

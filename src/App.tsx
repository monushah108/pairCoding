import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/playground";
import UserMe from "./components/dashborad/userMe";
import Server from "./components/dashborad/Server";
import Authpage from "./pages/Authpage";
import { RegisterForm } from "./components/register-form";
import { LoginForm } from "./components/login-form";
import Authoptions from "./components/Authoptions";
import ChatWindow from "./components/dashborad/chatWindow";
import Nochat from "./components/dashborad/noChat";
import Profile from "./pages/profile";

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
        children: [
          {
            index: true,
            element: <Nochat />,
          },
          {
            path: ":ChatId",
            element: <ChatWindow />,
          },
        ],
      },

      {
        path: "server/:serverId",
        element: <Server />,
        children: [
          {
            path: ":chatId",
            element: "",
          },
        ],
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
    path: "/playground/:palyId",
    element: <Playground />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

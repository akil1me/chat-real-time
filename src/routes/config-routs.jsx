import { Navigate, useRoutes } from "react-router-dom";
import { Chat, Login, Profil } from "../pages";

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../utils/firebase";

const routes = [
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "pofhile/:id",
    element: <Profil />
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]


const loginRout =
  [
    {
      path: "login",
      element: <Login />
    },

    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ]


export const ConfigRouts = () => {

  const [user] = useAuthState(auth)

  return useRoutes(user ? [...routes] : [...loginRout])
}
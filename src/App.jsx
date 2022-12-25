import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "./components";
import { auth } from "./utils/firebase";

import { ConfigRouts } from "./routes";

export const App = () => {
  const [user, laod] = useAuthState(auth)

  if (laod) {
    return <Loader />
  }
  return (
    <>
      <ConfigRouts />
    </>
  );
}

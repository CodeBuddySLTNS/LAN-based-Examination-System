import { useState } from "react";
import { useMainStore } from "./states/store";

import Page from "./app/dashboard/page";
import Login from "./app/login/page";

function App() {
  const [count, setCount] = useState(0);
  const isLoggedIn = useMainStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useMainStore((state) => state.setIsLoggedIn);

  return <div>{isLoggedIn ? <Page /> : <Login />}</div>;
}

export default App;

import { routes } from "./routes";
import { useRoutes } from "react-router-dom";
import { useAuthContext } from "./hooks";

function App() {
  const { state } = useAuthContext();
  const content = useRoutes(routes(state.user));
  return content;
}

export default App;

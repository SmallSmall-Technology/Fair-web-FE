import { router } from "./Router/Router";
import { RouterProvider } from "react-router";
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import router from "./routes/routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;

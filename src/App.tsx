import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routesConfig from "@src/routes/routesConfig";

const router = createBrowserRouter(routesConfig);

function App() {
  return (
    <div dir="rtl">
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer rtl style={{ direction: "rtl", fontSize: 20 }} />
    </div>
  );
}

export default App;

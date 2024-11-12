import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AttForm from "./pages/AttForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />},
      { path: "form/:formId",
        element: <AttForm />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

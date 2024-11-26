import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AttForm from "./pages/AttForm";
import SuccessPage from "./pages/SuccessPage";
import {library} from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faChalkboardTeacher, faBook, faLaptop, faUserGraduate, faBuildingColumns, faPercentage, faBrain, faSquareRootVariable } from '@fortawesome/free-solid-svg-icons'

library.add(faPencilAlt, faChalkboardTeacher, faBook, faLaptop, faUserGraduate, faBuildingColumns, faPercentage, faBrain, faSquareRootVariable)


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />},
      { path: "form/:formId",
        element: <AttForm />,
      },
      { path: "success",
        element: <SuccessPage />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

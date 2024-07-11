import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PersonDetails from "./components/peopleList/PersonDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <HomePage />,
        children: [
          {
            path: ":id",
            element: <PersonDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

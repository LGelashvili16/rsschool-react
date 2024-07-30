import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PersonDetails from "./components/peopleList/PersonDetails";
import GlobalContextProvider from "./context/GlobalContext";
import AboutPage from "./pages/AboutPage";
import { Provider } from "react-redux";
import store from "./features/store";

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
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <GlobalContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GlobalContextProvider>
  );
};

export default App;

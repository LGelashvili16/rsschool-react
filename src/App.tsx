import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PersonDetails from "./components/peopleList/PersonDetails";
import AboutPage from "./pages/AboutPage";
import { Provider } from "react-redux";
import store from "./store/store";
import ThemeContextProvider from "./context/ThemeContext";

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
    <ThemeContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeContextProvider>
  );
};

export default App;

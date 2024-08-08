import { render, screen } from "@testing-library/react";
import PeopleList from "./PeopleList";
import "@testing-library/jest-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { Provider } from "react-redux";
import store from "../../store/store";

// Mock data
const mockDataWithPeople = {
  count: 3,
  results: [
    { url: "1", name: "Person 1" },
    { url: "2", name: "Person 2" },
    { url: "3", name: "Person 3" },
  ],
  previous: null,
  next: null,
};

const mockDataWithoutPeople = {
  count: 0,
  results: [],
  previous: null,
  next: null,
};

// Mock fetchPeople function
// const mockFetchPeople = vi.fn();

describe("PeopleList component", () => {
  const routes = [
    {
      path: "/",
      element: (
        <Provider store={store}>
          <GlobalContext.Provider
            value={{
              pageQuery: 1,
              searchQuery: "",
              updateQueryStringHandler: vi.fn(),
              updatePage: vi.fn(),
            }}
          >
            <PeopleList data={mockDataWithPeople} />
          </GlobalContext.Provider>
        </Provider>
      ),
    },
  ];
  const router = createBrowserRouter(routes);

  it("renders the specified number of cards", () => {
    render(<RouterProvider router={router} />);

    // Check if the correct number of Person components are rendered
    const personCards = screen.getAllByRole("link");
    expect(personCards).toHaveLength(mockDataWithPeople.results.length + 1);
  });

  it("displays an appropriate message if no cards are present", () => {
    // Update routes for no people case
    const routesNoPeople = [
      {
        path: "/",
        element: (
          <Provider store={store}>
            <GlobalContext.Provider
              value={{
                pageQuery: 1,
                searchQuery: "",
                updateQueryStringHandler: vi.fn(),
                updatePage: vi.fn(),
              }}
            >
              <PeopleList data={mockDataWithoutPeople} />
            </GlobalContext.Provider>
          </Provider>
        ),
      },
    ];
    const routerNoPeople = createBrowserRouter(routesNoPeople);

    render(<RouterProvider router={routerNoPeople} />);

    // Check if the "No result" message is displayed
    expect(screen.getByText(/No result/i)).toBeInTheDocument();
  });
});

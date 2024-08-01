import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import PersonDetails from "./PersonDetails";
import { vi } from "vitest";
import { Provider } from "react-redux";
import store from "../../store/store";
import { usePersonQuery } from "../../api/api";

// Mock the API
vi.mock("../../api/api", async () => {
  const actual = await vi.importActual("../../api/api");
  return {
    ...actual,
    usePersonQuery: vi.fn(),
  };
});

const navigateMock = vi.fn();

// Mock react-router-dom functions
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ id: "1" }),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

// Mock GlobalContext values
const mockGlobalContext = {
  pageQuery: 1,
  searchQuery: "",
  updateQueryStringHandler: vi.fn(),
  updatePage: vi.fn(),
};

// Define routes
const routes = [
  {
    path: "/",
    element: <PersonDetails />,
  },
];

const router = createBrowserRouter(routes);

describe("PersonDetails Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display a loading indicator while fetching data", async () => {
    vi.mocked(usePersonQuery).mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
      isUninitialized: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <GlobalContext.Provider value={mockGlobalContext}>
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </Provider>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display the detailed card data when the data is fetched", async () => {
    vi.mocked(usePersonQuery).mockReturnValue({
      data: {
        count: 1,
        results: [
          {
            id: "1",
            name: "John Doe",
            age: "30",
            birth_year: "1990",
            eye_color: "Blue",
            gender: "Male",
            hair_color: "Black",
            height: "180",
            mass: "75",
            skin_color: "Fair",
          },
        ],
        previous: null,
        next: null,
      },
      isFetching: false,
      isError: false,
      isUninitialized: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <GlobalContext.Provider value={mockGlobalContext}>
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </Provider>,
    );

    await waitFor(() => expect(screen.getByText(/John/i)).toBeInTheDocument());
    expect(screen.getByText(/Birth Year: 1990/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color: Blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair Color: Black/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 180/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 75/i)).toBeInTheDocument();
    expect(screen.getByText(/Skin Color: Fair/i)).toBeInTheDocument();
  });

  it("should display an error message when there is an error", async () => {
    vi.mocked(usePersonQuery).mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
      isUninitialized: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <GlobalContext.Provider value={mockGlobalContext}>
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </Provider>,
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("should navigate to the home page with query parameters when the close button is clicked", async () => {
    vi.mocked(usePersonQuery).mockReturnValue({
      data: {
        count: 1,
        results: [
          {
            id: "1",
            name: "John Doe",
            birth_year: "1990",
            eye_color: "blue",
            gender: "male",
            hair_color: "black",
            height: "180",
            mass: "75",
            skin_color: "fair",
          },
        ],
        previous: null,
        next: null,
      },
      isFetching: false,
      isError: false,
      isUninitialized: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <GlobalContext.Provider value={mockGlobalContext}>
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByText(/close tab/i));

    expect(navigateMock).toHaveBeenCalledWith("/home/?page=1&search=");
  });
});

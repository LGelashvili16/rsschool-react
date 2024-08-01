import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import PersonDetails from "./PersonDetails";
import { vi } from "vitest";
import useFetchData from "../../hooks/useFetchData";

const navigateMock = vi.fn();

// Mock only the necessary parts of react-router-dom
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

// Define the routes
const routes = [
  {
    path: "/",
    element: <PersonDetails />,
  },
];

const router = createBrowserRouter(routes);

vi.mock("../../hooks/useFetchData");

describe("PersonDetails Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
    // vi.resetAllMocks();
  });

  it("should display a loading indicator while fetching data", async () => {
    vi.mocked(useFetchData).mockReturnValue({
      data: {
        count: 1,
        results: [],
        previous: null,
        next: null,
      },
      loading: true,
      error: null,
      fetchPeople: vi.fn(),
    });

    render(
      <GlobalContext.Provider value={mockGlobalContext}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>,
    );

    screen.debug();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display the detailed card data when the data is fetched", async () => {
    vi.mocked(useFetchData).mockReturnValue({
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
      loading: false,
      error: null,
      fetchPeople: vi.fn(),
    });

    render(
      <GlobalContext.Provider value={mockGlobalContext}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>,
    );

    await waitFor(() => expect(screen.getByText(/John/i)).toBeInTheDocument());
    expect(screen.getByText(/Birth Year: 1990/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair Color: black/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 180/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 75/i)).toBeInTheDocument();
    expect(screen.getByText(/Skin Color: fair/i)).toBeInTheDocument();
  });

  it("hides the component when the close button is clicked", async () => {
    vi.mocked(useFetchData).mockReturnValue({
      data: {
        count: 1,
        results: [
          {
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
      loading: false,
      error: null,
      fetchPeople: vi.fn(),
    });

    render(
      <GlobalContext.Provider value={mockGlobalContext}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>,
    );
    screen.debug();

    // Click the close button
    fireEvent.click(screen.getByText(/close tab/i));

    // Check if the navigate function was called
    expect(navigateMock).toHaveBeenCalledWith("/home/?page=1&search=");
  });
});

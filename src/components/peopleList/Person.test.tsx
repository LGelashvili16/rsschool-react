import { render, screen, fireEvent } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { vi } from "vitest";
import Person from "./Person";
import PersonDetails from "./PersonDetails";

// Mock useFetchData hook
vi.mock("../../hooks/useFetchData", () => ({
  default: vi.fn(() => ({
    data: {
      count: 1,
      results: [
        {
          name: "John Doe",
          eye_color: "blue",
          height: "180",
          mass: "75",
          birth_year: "1990",
        },
      ],
      previous: null,
      next: null,
    },
    loading: false,
    error: null,
    fetchPeople: vi.fn(),
  })),
}));

const mockPerson = {
  name: "John Doe",
  eye_color: "blue",
  height: "180",
  mass: "75",
  birth_year: "1990",
};

const routes = [
  {
    path: "/",
    element: <Person person={mockPerson} />,
  },
  {
    path: "/home/:name",
    element: <PersonDetails />,
  },
];

describe("Person Component", () => {
  const router = createBrowserRouter(routes);

  beforeEach(() => {
    // Clear all mock calls before each test
    vi.clearAllMocks();
  });

  it("renders the relevant card data", () => {
    render(<RouterProvider router={router} />);

    // Check if all data is rendered correctly
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Eye Color: blue")).toBeInTheDocument();
    expect(screen.getByText("Height: 180cm")).toBeInTheDocument();
    expect(screen.getByText("Mass: 75Kg")).toBeInTheDocument();
    expect(screen.getByText("Birth Year: 1990")).toBeInTheDocument();
  });

  it("opens a detailed card component on click", () => {
    render(<RouterProvider router={router} />);
    const linkElement = screen.getByRole("link");

    // Simulate a click on the link
    fireEvent.click(linkElement);

    // Check if the URL is updated correctly
    expect(screen.getByText(/Person Details/i)).toBeInTheDocument();
  });
});

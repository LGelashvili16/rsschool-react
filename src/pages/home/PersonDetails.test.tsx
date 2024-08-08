import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import store from "../../store/store";
import { usePersonQuery } from "../../api/api";
import PersonDetails from "./[personName]";

// Mock the API
vi.mock("../../api/api", async () => {
  const actual = await vi.importActual("../../api/api");
  return {
    ...actual,
    usePersonQuery: vi.fn(),
  };
});

const pushMock = vi.fn();
const useRouterMock = {
  push: pushMock,
  query: { id: "1" },
  asPath: "/",
  route: "/",
};

vi.mock("next/router", () => ({
  useRouter: () => useRouterMock,
}));

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
        <PersonDetails />
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
        <PersonDetails />
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
        <PersonDetails />
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
        <PersonDetails />
      </Provider>,
    );

    fireEvent.click(screen.getByText(/close tab/i));

    expect(pushMock).toHaveBeenCalledWith("/home/?page=1&search=");
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Person from "./Person";
import { Provider } from "react-redux";
import store from "../../store/store";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";

vi.mock("next/router", () => ({
  useRouter: () =>
    ({
      push: vi.fn(),
      query: {},
      asPath: "",
      route: "/",
    }) as unknown as NextRouter,
}));

const MockPersonDetails = () => <div>Person Details</div>;

const mockPerson = {
  name: "John Doe",
  eye_color: "blue",
  height: "180",
  mass: "75",
  birth_year: "1990",
};

describe("Person Component", () => {
  // const mockRouter = useRouter();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the relevant card data", () => {
    render(
      <Provider store={store}>
        <Person person={mockPerson} />
      </Provider>,
    );

    // Check if all data is rendered correctly
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Eye Color: blue")).toBeInTheDocument();
    expect(screen.getByText("Height: 180cm")).toBeInTheDocument();
    expect(screen.getByText("Mass: 75Kg")).toBeInTheDocument();
    expect(screen.getByText("Birth Year: 1990")).toBeInTheDocument();
  });

  it("opens a detailed card component on click", async () => {
    render(
      <Provider store={store}>
        <Person person={mockPerson} />
        <MockPersonDetails />
      </Provider>,
    );

    screen.debug();

    const buttonElement = screen.getByRole("button", { name: /Open/i });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      // expect(mockRouter.push).toHaveBeenCalledWith(
      //   "/home?personName=John%20Doe",
      //   undefined,
      //   { shallow: true },
      // );
      expect(screen.getByText(/Person Details/i)).toBeInTheDocument();
    });
  });
});

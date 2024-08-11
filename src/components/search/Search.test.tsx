import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Search from "./Search";
import { Provider } from "react-redux";
import store from "../../store/store";

const useRouterMock = {
  push: vi.fn(),
  query: {},
  asPath: "/",
  route: "/",
};

vi.mock("next/router", () => ({
  useRouter: () => useRouterMock,
}));

describe("Search Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("saves the entered value to local storage when the Search button is clicked", async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    const inputElement = screen.getByTestId("search-input");
    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.change(inputElement, { target: { value: "test search" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(localStorage.getItem("searchedTerm")).toBe(
        JSON.stringify("test search"),
      );
    });
  });

  it("retrieves the value from local storage upon mounting", () => {
    localStorage.setItem("searchedTerm", JSON.stringify("stored search"));

    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    const inputElement = screen.getByTestId("search-input");

    expect(inputElement).toHaveValue("stored search");
  });
});

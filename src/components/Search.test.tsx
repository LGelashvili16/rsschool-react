import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Search from "./Search";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ id: "1" }),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

const mockFetchData = vi.fn();

describe("Search Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("saves the entered value to local storage when the Search button is clicked", async () => {
    render(<Search fetchData={mockFetchData} />);

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

    render(<Search fetchData={mockFetchData} />);

    const inputElement = screen.getByTestId("search-input");

    expect(inputElement).toHaveValue("stored search");
    expect(mockFetchData).toHaveBeenCalledWith("", "stored search");
  });
});

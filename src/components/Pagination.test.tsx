import { fireEvent, render, screen } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pagination from "./Pagination";
import { GlobalContext } from "../context/GlobalContext";

// const navigateMock = vi.fn();

// vi.mock("react-router-dom", async () => {
//   const actual = await vi.importActual("react-router-dom");
//   return {
//     ...actual,
//     useNavigate: () => navigateMock,
//     useParams: () => ({ id: "1" }),
//     useSearchParams: () => [new URLSearchParams(), vi.fn()],
//   };
// });

const mockFetchPeople = vi.fn();
const mockUpdatePage = vi.fn();

const mockGlobalContext = {
  pageQuery: 1,
  searchQuery: "",
  updateQueryStringHandler: vi.fn(),
  updatePage: mockUpdatePage,
};

const routes = [
  {
    path: "/",
    element: <Pagination count={20} fetchPeople={mockFetchPeople} />,
  },
];

const router = createBrowserRouter(routes);

describe("Search", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should update the URL on button click", () => {
    render(
      <GlobalContext.Provider value={mockGlobalContext}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>,
    );

    const button = screen.getByText("2");

    fireEvent.click(button);
    screen.debug();

    // Check if the navigate function was called
    expect(mockFetchPeople).toHaveBeenCalledWith("", "", "?page=2");
    expect(mockUpdatePage).toHaveBeenCalledWith(2);
  });
});

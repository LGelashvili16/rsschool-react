import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
import { Provider } from "react-redux";
import store from "../../store/store";

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { page: "1" },
    asPath: "/",
    route: "/",
  }),
}));

describe("Search", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should update the URL on button click", () => {
    render(
      <Provider store={store}>
        <Pagination count={20} />
      </Provider>,
    );

    const button = screen.getByText("2");
    fireEvent.click(button);

    expect(store.getState().personList.currentPage).toBe(2);
  });
});

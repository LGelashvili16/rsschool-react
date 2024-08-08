import { render, screen } from "@testing-library/react";
import PeopleList from "./PeopleList";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
// import { useRouter } from "next/router";

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: {},
    asPath: "",
    route: "/",
  }),
}));

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

describe("PeopleList component", () => {
  // const mockRouter = useRouter();

  it("renders the specified number of cards", () => {
    render(
      <Provider store={store}>
        <PeopleList data={mockDataWithPeople} />
      </Provider>,
    );

    // Check if the correct number of Person components are rendered
    const personCards = screen.getAllByText(/Person/);
    expect(personCards).toHaveLength(mockDataWithPeople.results.length);
  });

  it("displays an appropriate message if no cards are present", () => {
    render(
      <Provider store={store}>
        <PeopleList data={mockDataWithoutPeople} />
      </Provider>,
    );

    expect(screen.getByText(/No result/i)).toBeInTheDocument();
  });
});

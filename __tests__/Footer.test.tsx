import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/app/pageComponents/Footer";

describe("Footer", () => {
  it("should render the correct todo list count", () => {
    render(<Footer todosLength={3} />);
    const paragraph = screen.getByText("3 tasks left");
    expect(paragraph).toBeInTheDocument();
  });

  it("should show 'task' if the todo list count is 1", () => {
    render(<Footer todosLength={1} />);
    expect(screen.getByText("1 task left")).toBeInTheDocument();
  });
});

// it("should be in a paragraph tag", () => {
//   render(<Footer todosLength={1} />);
//   expect(screen.getByText("1 task left")).toContainHTML("p");
// });

// it("should not be falsy", () => {
//   render(<Footer todosLength={4} />);
//   expect(screen.getByText("4 tasks left")).not.toBeFalsy();
// });

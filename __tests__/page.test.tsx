import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@/app/page";

const addTasks = (tasks: string[]) => {
  const input: HTMLInputElement =
    screen.getByPlaceholderText(/Add a new todo.../i);
  const button = screen.getByRole("button", { name: /add/i });

  tasks.forEach((task) => {
    fireEvent.change(input, { target: { value: task } });
    fireEvent.click(button);
  });
};

describe("Home", () => {
  beforeEach(() => {
    localStorage.clear();
    render(<Home />);
  });

  it("should show added task in todo list", () => {
    addTasks(["Kick a duck"]);
    const spanElement = screen.getByText(/Kick a duck/i);
    expect(spanElement).toBeInTheDocument();
  });

  it("should show list of added tasks in todo list", () => {
    localStorage.setItem("todos", JSON.stringify(["Keep bees", "Love life"]));
    const localData: string[] = JSON.parse(localStorage.getItem("todos")!);

    addTasks(["Kick a duck", "Pick on Pete", "Wash the car", ...localData]);
    const spanElements = screen.getAllByTestId("task-item");
    expect(spanElements.length).toBe(5);
  });
});

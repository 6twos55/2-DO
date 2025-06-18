import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Main from "@/app/pageComponents/Main";
import { useState } from "react";

const mockedFunc = jest.fn();

describe("Main", () => {
  it("should render input element", () => {
    render(
      <Main
        todos={["Kick a duck", "Save a boat's neck"]}
        setTodos={mockedFunc}
        completed={[]}
        setCompleted={mockedFunc}
        isMainPage={true}
      />
    );

    const input = screen.getByPlaceholderText(/Add a new todo.../i);
    expect(input).toBeInTheDocument();
  });

  it("should be able to type into input element", () => {
    render(
      <Main
        todos={["Kick a duck", "Save a boat's neck"]}
        setTodos={mockedFunc}
        completed={[]}
        setCompleted={mockedFunc}
        isMainPage={true}
      />
    );

    const input: HTMLInputElement =
      screen.getByPlaceholderText(/Add a new todo.../i);
    fireEvent.change(input, { target: { value: "Kick a duck" } });

    expect(input.value).toBe("Kick a duck");
  });

  it("should clear input content after add button click", () => {
    render(
      <Main
        todos={["Kick a duck", "Save a boat's neck"]}
        setTodos={mockedFunc}
        completed={[]}
        setCompleted={mockedFunc}
        isMainPage={true}
      />
    );

    const input: HTMLInputElement =
      screen.getByPlaceholderText(/Add a new todo.../i);
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Kick a duck" } });
    fireEvent.click(button);

    expect(input.value).toBe("");
  });

  it("should remove task from list after task is clicked", () => {
    const Wrapper: React.FC = () => {
      const [todos, setTodos] = useState(["Kick a duck", "Save a boat's neck"]);

      return (
        <Main
          todos={todos}
          setTodos={setTodos}
          completed={[]}
          setCompleted={mockedFunc}
          isMainPage={true}
        />
      );
    };

    render(<Wrapper />);

    const spanElement = screen.getByText("Kick a duck");
    fireEvent.click(spanElement);

    const deleted = screen.queryByText("Kick a duck");
    expect(deleted).not.toBeInTheDocument();
  });

  it("renders no tasks when there's no todo left", () => {
    render(
      <Main
        todos={[]}
        setTodos={mockedFunc}
        completed={[]}
        setCompleted={mockedFunc}
        isMainPage={true}
      />
    );
    const msg = screen.queryByText(/No tasks left 👍/i);
    expect(msg).toBeInTheDocument();
  });

  it("shows completed tasks on completed screen", () => {
    render(
      <Main
        todos={[]}
        setTodos={mockedFunc}
        completed={["Kick the president", "Slap Ebuka"]}
        setCompleted={mockedFunc}
        isMainPage={false}
      />
    );

    const completedTasks = screen.getAllByTestId("completed-task");
    expect(completedTasks.length).toBe(2);
  });

  it("shows no completed tasks if none are complete", () => {
    render(
      <Main
        todos={[]}
        setTodos={mockedFunc}
        completed={[]}
        setCompleted={mockedFunc}
        isMainPage={false}
      />
    );

    const noCompletedTasks = screen.getByText(/No completed tasks yet ⏳/i);
    expect(noCompletedTasks).toBeInTheDocument();

    screen.debug();
  });
});

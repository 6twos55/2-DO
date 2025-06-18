"use client";

import { FormEvent, useState } from "react";

type MainProps = {
  todos: Array<string>;
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
  completed: Array<string>;
  setCompleted: React.Dispatch<React.SetStateAction<string[]>>;
  isMainPage: boolean;
};

const Main = ({
  todos,
  setTodos,
  completed,
  setCompleted,
  isMainPage,
}: MainProps) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (
    newItem: string,
    setNewItem: React.Dispatch<React.SetStateAction<string>>,
    e: FormEvent
  ) => {
    e.preventDefault();
    if (newItem.length > 0) {
      const content = JSON.stringify([...todos, newItem]);
      localStorage.setItem("todos", content);

      const updatedArray = JSON.parse(localStorage.getItem("todos")!);
      setTodos(updatedArray);
    }
    setNewItem("");
  };

  const handleRemove = (index: number) => {
    const content = [...completed, todos[index]].slice(-20);
    localStorage.setItem("completed", JSON.stringify(content));
    setCompleted(JSON.parse(localStorage.getItem("completed")!));

    const updatedTodos = todos.filter((_, i: number) => i !== index);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(JSON.parse(localStorage.getItem("todos")!));
  };

  const handleClearAll = () => {
    localStorage.setItem("completed", JSON.stringify([]));
    setCompleted([]);
  };

  return (
    <>
      {isMainPage && (
        <main className="flex flex-col items-center justify-between gap-8 sm:gap-14 w-[100%]">
          <form
            onSubmit={(e) => handleSubmit(newTodo, setNewTodo, e)}
            className="flex items-center justify-between gap-3 sm:gap-5 w-[100%]"
          >
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="w-[75%] sm:w-[85%] p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-gray-900 outline-none hover:bg-gray-800 transition-colors duration-100 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="px-4 sm:px-8 py-3 sm:py-5 rounded-2xl sm:rounded-3xl w-[25%] sm:w-[20%] bg-green-600 hover:bg-green-500 transition-colors cursor-pointer text-sm sm:text-base"
            >
              Add
            </button>
          </form>

          <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-6 w-[100%] max-h-[70vh] sm:max-h-[60vh] overflow-y-auto scrollable">
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <span
                  className="hover:line-through bg-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-sm sm:text-base"
                  key={index}
                  onClick={() => handleRemove(index)}
                  data-testid="task-item"
                >
                  {todo}
                </span>
              ))
            ) : (
              <span className="text-center text-sm sm:text-base">
                No tasks left 👍
              </span>
            )}
          </div>
        </main>
      )}

      {!isMainPage && (
        <main className="flex flex-col">
          <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-6 w-[100%] max-h-[70vh] sm:max-h-[60vh] overflow-y-auto scrollable">
            {completed.length > 0 ? (
              completed.map((todo, index) => (
                <span
                  className="line-through cursor-not-allowed bg-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-sm sm:text-base"
                  data-testid="completed-task"
                  key={index}
                >
                  {todo}
                </span>
              ))
            ) : (
              <span className="text-center">No completed tasks yet ⏳</span>
            )}
          </div>

          {completed.length > 0 && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleClearAll}
                className="w-fit px-4 py-2 text-sm sm:text-base bg-red-600 hover:bg-red-500 rounded-xl transition-colors duration-200"
              >
                Empty list
              </button>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Main;

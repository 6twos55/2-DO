"use client";

import { useEffect, useState } from "react";
import Footer from "./pageComponents/Footer";
import Header from "./pageComponents/Header";
import Main from "./pageComponents/Main";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [isMainPage, setIsMainPage] = useState(true);

  useEffect(() => {
    const todosList = JSON.parse(localStorage.getItem("todos") || "[]");
    const completedList = JSON.parse(localStorage.getItem("completed") || "[]");

    setTodos(todosList);
    setCompleted(completedList);
  }, []);

  return (
    <main
      className="flex flex-col gap-10 md:gap-14 lg:gap-20 py-5 sm:py-10 px-4 sm:px-10 md:px-20 lg:px-24 xl:px-32 font-['Poppins']"
      data-testid="parent-element"
    >
      <Header
        title={"2-DO"}
        isMainPage={isMainPage}
        setIsMainPage={setIsMainPage}
      />

      <Main
        todos={todos}
        setTodos={setTodos}
        completed={completed}
        setCompleted={setCompleted}
        isMainPage={isMainPage}
      />

      <Footer todosLength={todos.length} />
    </main>
  );
}

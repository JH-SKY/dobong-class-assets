import React from "react";

const TodoList = () => {
  const todos = [
    { id: 1, text: "리액트 공부", done: true, important: true },
    { id: 2, text: "운동하기", done: false, important: false },
    { id: 3, text: "장보기", done: true, important: false },
    { id: 4, text: "프로젝트 제출", done: false, important: true },
  ];
  return (
    <>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="my-1">
              <span className={todo.done && "line-through text-gray-500"}>
                {todo.text}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {todo.done ? "완료" : "미완료"}
              </span>
              <span className="text-xs text-red-500 ml-2">
                {todo.important && "중요"}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;

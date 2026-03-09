import React from "react";

const TodoList = () => {
  const todos = [
    { id: 1, text: "리액트 공부", done: true, important: true },
    { id: 2, text: "운동하기", done: false, important: false },
    { id: 3, text: "장보기", done: true, important: false },
    { id: 4, text: "프로젝트 제출", done: false, important: true },
  ];
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              className={todo.done ? "line-through text-gray-400" : "font-bold"}
            >
              {todo.text}
            </span>
            <span> {todo.done ? "완료" : "미완료"}</span>
            <span className={todo.important ? "text-red-500 font-bold" : ""}>
              {todo.important && " 중요"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

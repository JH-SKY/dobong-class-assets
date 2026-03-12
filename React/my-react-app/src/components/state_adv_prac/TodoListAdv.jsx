import React from "react";
import { useState } from "react";

const TodoListAdv = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "리액트 공부", done: false },
    { id: 2, text: "점심 먹기", done: false },
  ]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const handleDelete = (id) => {
    console.log("삭제!");
    console.log(id);
    // todos에서 id에 해당하는 값을 없애는 것.
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const handleToggle = (id) => {
    // id에 해당하는 todo만 done을 바꾸고
    // 나머지는 유지한다.
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input"
      />
      <button className="button" onClick={handleAdd}>
        추가
      </button>{" "}
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <span
                onClick={() => handleToggle(todo.id)}
                className={todo.done ? "line-through" : ""}
              >
                {todo.text}
              </span>
              <button onClick={() => handleDelete(todo.id)} className="button">
                삭제
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoListAdv;

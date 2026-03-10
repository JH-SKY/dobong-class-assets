import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState(["리액트 공부", "점심 먹기"]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="card">
      <div>TodoList</div>
      <input
        className="input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>추가</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
        );
        setTodos(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [userId]);

  return (
    <div>
      <div>UserTodoList</div>
      <select
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      >
        <option value={1}>1번 유저</option>
        <option value={2}>2번 유저</option>
        <option value={3}>3번 유저</option>
        <option value={4}>4번 유저</option>
        <option value={5}>5번 유저</option>
      </select>
      {isLoading ? (
        <p>로딩중입니다...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                // 1. 완료되었다면(true) 'line-through'(취소선), 아니면 'none'(없음)
                textDecoration: todo.completed ? "line-through" : "none",
                // 2. 완료된 건 흐릿하게 보이게 회색으로 처리하면 더 좋아요!
                color: todo.completed ? "#aaa" : "#000",
                marginBottom: "8px",
              }}
            >
              {todo?.completed ? "✅" : "❌"}
              {todo.title}
            </li>
          ))}
        </ul>
      )}
      {error && <p style={{ color: "red" }}>에러 발생: {error}</p>}
    </div>
  );
};

export default UserTodoList;

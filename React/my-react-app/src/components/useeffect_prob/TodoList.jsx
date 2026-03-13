import axios from "axios";
import React, { useEffect, useState } from "react";

const TodoList = () => {
  // 1. userid를 select하는 input과 state
  // 2. todo를 보여줄 state.
  // 3. todo를 가져올 axios가 필요

  // 처음에는 1번 사용자의 할일 목록 보여주기
  // => useEffect를 사용해서 1번 사용자에 대한 axios 보내기

  // select input을 통해 userid가 변합니다.
  //     -> setUSerId
  //     -> 해당 userid에 대해 새로운 요청이 갑니다.
  //     -> useeffect의 의존성 배열에 userid가 추가되서 변할때마다 요청이 가게 된다.

  //   const todos = [
  //     {
  //       userId: 1,
  //       id: 1,
  //       title: "delectus aut autem",
  //       completed: true,
  //     },
  //     {
  //       userId: 1,
  //       id: 2,
  //       title: "quis ut nam facilis et officia qui",
  //       completed: false,
  //     },
  //     {
  //       userId: 1,
  //       id: 3,
  //       title: "fugiat veniam minus",
  //       completed: false,
  //     },
  //   ];

  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState("1");

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
      );
      //   console.log(response.data);
      setTodos(response.data);
    };

    fetchTodos();
  }, [userId]);

  return (
    <div className="card">
      <div>TodoList</div>
      <select
        className="input"
        name="options"
        onChange={(e) => {
          setUserId(e.target.value);
          //   console.log(e.target.value);
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((num) => {
          return (
            <option key={num} value={num}>
              {num}
            </option>
          );
        })}
        {/* <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option> */}
      </select>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.completed && <span className="text-green-500">✓ </span>}
              {todo.title}
            </li>
          );
        })}
        <li></li>
      </ul>
    </div>
  );
};

export default TodoList;

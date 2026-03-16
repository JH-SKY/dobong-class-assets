import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 서버에 요청을 보내서 데이터를 저장하고 싶음.
    if (inputText.trim() === "") return;
    try {
      const data = { text: inputText };
      const response = await axios.post(API_URL, data);

      setTodos([...todos, response.data]);

      fetchTodos();

      setInputText("");
    } catch (error) {
      alert("이상이 발생했습니다. 새로고침 후 다시 시도해주세요.");
    }
  };

  const handleUpdate = async (todoId) => {
    try {
      await axios.put(API_URL + `/${todoId}/toggle`);

      const newTodos = todos.map((todo) => {
        return todo.id === todoId ? { ...todo, done: !todo.done } : todo;
      });
      console.log(newTodos);
      setTodos(newTodos);

      // fetchTodos() 로 바꿀 수 있습니다.

      // 성공하면 상태 바꾸기
    } catch (error) {
      // 실패하면 상태 바꾸지 않고 알람 보내기
    }
  };

  const handleDelete = async (todoId) => {
    try {
      // alert("정말 삭제하시겠습니까?");
      //  => modal, 확인 누르면 삭제 / 취소 누르면 아래 로직 실행 안하기.
      await axios.delete(API_URL + `/${todoId}`);

      const newTodos = todos.filter((todo) => {
        return todo.id !== todoId;
      });

      setTodos(newTodos);

      // fetchTodos() 로 바꿀 수 있습니다.

      // 성공하면 상태 바꾸기
    } catch (error) {
      // 실패하면 상태 바꾸지 않고 알람 보내기
    }
  };

  const handleEditText = async (e, todoId) => {
    if (e.key !== "Enter") return;
    // 수정로직이 들거갈껍니다.

    try {
      const data = { text: editText };
      console.log(data);

      await axios.put(API_URL + `/${todoId}`, data);

      const newTodos = todos.map((todo) => {
        return todo.id === todoId ? { ...todo, text: editText } : todo;
      });
      console.log(newTodos);
      setTodos(newTodos);

      setEditId(null);
      setEditText("");
      // fetchTodos() 로 바꿀 수 있습니다.

      // 성공하면 상태 바꾸기
    } catch (error) {
      // 실패하면 상태 바꾸지 않고 알람 보내기
    }
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
    // useref같은걸 활용해서 input 태그에 focus가 가도록 할 수도 있습니다.
  };

  return (
    <div>
      <h2>TodoList</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="input"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <button className="button">추가하기</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li className="card" key={todo.id}>
            {editId === todo.id ? (
              <input
                className="input"
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => handleEditText(e, todo.id)}
                value={editText}
                autoFocus
              />
            ) : (
              <span
                onClick={() => startEdit(todo)}
                className={todo.done ? `line-through` : ""}
              >
                {todo.text}
              </span>
            )}

            <button onClick={() => handleUpdate(todo.id)} className="button">
              완료
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="button ml-5"
            >
              삭제하기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

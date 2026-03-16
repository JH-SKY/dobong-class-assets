import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]); // 서버에서 온 장부를 담는 바구니
  const [input, setInput] = useState(""); // 새로 쓸 내용을 잠시 담는 그릇

  // 1. [조회] 화면 켜지자마자 서버 장부 읽어오기
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  // 2. [등록] 새 데이터를 서버에 적고 내 화면에도 반영하기
  const handleadd = async () => {
    if (input.trim() === "") return;
    const response = await axios.post(API_URL, { text: input, done: false });
    setTodos([...todos, response.data]); // 기존 거 유지하고 새 거 추가
    setInput(""); // 입력창 비우기
  };

  // 3. [삭제] 서버에서 지우고 내 화면 목록에서도 빼기
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((t) => t.id !== id)); // 지운 번호만 빼고 남기기
  };

  // 4. [완료] 서버의 전용 통로로 상태 뒤집기 보고하기
  const handleToggle = async (todo) => {
    const response = await axios.put(`${API_URL}/${todo.id}/toggle`);
    // 서버가 뒤집어서 준 최신 데이터로 내 바구니 업데이트
    setTodos(todos.map((t) => (t.id === todo.id ? response.data : t)));
  };

  return (
    <div className="container">
      {/* 입력 구역 */}
      <input
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleadd()}
      />
      <button className="button" onClick={handleadd}>
        등록
      </button>

      {/* 리스트 구역 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {/* 완료 상태면 취소선 긋기 */}
            <span className={todo.done ? "line-through" : ""}>{todo.text}</span>
            <button className="button" onClick={() => handleToggle(todo)}>
              완료
            </button>
            <button className="button" onClick={() => handleDelete(todo.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

// --- [수정 기능을 위한 준비물: State] ---

// 1. 번호표: "지금 어떤 할 일을 수정하고 있는가?" (번호가 없으면 null)
const [editingId, setEditingId] = useState(null);

// 2. 임시 메모지: "수정창에 입력하는 글자를 잠시 담아두는 곳"
const [editInput, setEditInput] = useState("");

// --- [수정 기능을 작동시키는 함수들] ---

// 1단계: 수정 모드 켜기 (수정 버튼이나 글자 클릭 시)
const handleEditMode = (todo) => {
  // 클릭한 할 일의 번호(id)를 번호표에 적어요.
  setEditingId(todo.id);
  // 원래 써있던 글자를 임시 메모지에 미리 적어둬서 바로 수정하게 해줘요.
  setEditInput(todo.text);
};

// 2단계: 수정 취소하기 (수정하다가 마음이 바뀌었을 때)
const handleCancel = () => {
  setEditingId(null); // 번호표를 지우면 다시 일반 모드로 돌아가요.
  setEditInput("");   // 메모지도 깨끗이 비웁니다.
};

// 3단계: 수정 완료 및 저장 (저장 버튼 클릭 시)
const handleUpdate = async (id) => {
  // 1. [준비물] 수정할 놈의 원래 정보를 바구니에서 찾아요.
  const target = todos.find((t) => t.id === id);

  // 2. [일 시키기] 서버(PUT)에 "전체 정보를 줄 테니 내가 고친 글자만 덮어써!"라고 보내요.
  const response = await axios.put(`${API_URL}/${id}`, {
    ...target,      // id, done 등 기존 정보 복사
    text: editInput // 메모지에 적어둔 새 글자로 교체
  });

  // 3. [결과 보고] 서버가 고쳐준 새 데이터로 내 화면 목록을 업데이트해요.
  setTodos(todos.map((t) => (t.id === id ? response.data : t)));

  // 4. [마무리] 수정이 끝났으니 번호표를 반납해요.
  setEditingId(null);
};

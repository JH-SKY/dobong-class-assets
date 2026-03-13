import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTodoList = () => {
  // 1. [그릇 준비] 데이터를 담아두기 위해 미리 만든 빈 그릇이에요.
  const [todos, setTodos] = useState([]);

  // 2. [출입증] 어떤 유저의 정보를 가져올지 결정하는 번호표(ID)예요.
  const [userId, setUserId] = useState(1);

  // 3. [업무 지시] 유저 번호(userId)가 바뀔 때마다 실행할 행동을 정의해요.
  useEffect(() => {
    // 4. [배달 준비] 데이터를 가지러 갈 '심부름' 함수를 만들어요.
    const fetchTodos = async () => {
      // 5. [배달 시작] Axios라는 배달원이 해당 주소로 출입증(userId)을 들고 가요.
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
      );

      // 6. [그릇에 담기] 배달원이 가져온 데이터를 우리 그릇(todos)에 옮겨 담아요.
      setTodos(response.data);
    };

    // 7. [실행] 정의한 심부름 함수를 실제로 실행시켜요.
    fetchTodos();

    // 8. [관찰 대상] 여기 적힌 userId가 변할 때마다 4번부터 다시 시작하게 돼요.
  }, [userId]);

  return (
    <div className="card">
      <div>UserTodoList</div>

      {/* 9. [번호 변경] 사용자가 번호를 선택하면 출입증(userId)을 교체해요.수작업 */}
      {/* <select
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      >
        <option value={1}>1번 유저</option>
        <option value={2}>2번 유저</option>
        <option value={3}>3번 유저</option>
        <option value={4}>4번 유저</option>
        <option value={5}>5번 유저</option>
      </select> */}

      {/* 9. [번호 변경] 1부터 5까지 숫자를 순회하며 옵션을 자동으로 만들어요. */}

      <select
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}번 유저
          </option>
        ))}
      </select>

      {/* 10. [나열하기] 그릇에 담긴 할 일들을 하나씩 꺼내서 화면에 보여줘요. */}
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              // 완료 여부에 따라 글자 색상을 다르게 표시하는 삼항 연산자예요.
              color: todo.completed ? "#aaa" : "#000",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {/* 완료 상태면 체크, 아니면 엑스 표시를 붙여요. */}
            {todo.completed ? "✅" : "❌"} {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTodoList;

// 실무버전 ( 에러 처리, 로딩 상태 , 스타일링 추가 )
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserTodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(1);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const response = await axios.get(
//           `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
//         );
//         setTodos(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchTodos();
//   }, [userId]);

//   return (
//     <div className="card">
//       <div>UserTodoList</div>
//       <select
//         value={userId}
//         onChange={(e) => setUserId(Number(e.target.value))}
//       >
//         <option value={1}>1번 유저</option>
//         <option value={2}>2번 유저</option>
//         <option value={3}>3번 유저</option>
//         <option value={4}>4번 유저</option>
//         <option value={5}>5번 유저</option>
//       </select>
//       {isLoading ? (
//         <p>로딩중입니다...</p>
//       ) : (
//         <ul>
//           {todos.map((todo) => (
//             <li
//               key={todo.id}
//               style={{
//                 // 1. 완료되었다면(true) 'line-through'(취소선), 아니면 'none'(없음)
//                 textDecoration: todo.completed ? "line-through" : "none",
//                 // 2. 완료된 건 흐릿하게 보이게 회색으로 처리하면 더 좋아요!
//                 color: todo.completed ? "#aaa" : "#000",
//                 marginBottom: "8px",
//               }}
//             >
//               {todo?.completed ? "✅" : "❌"}
//               {todo.title}
//             </li>
//           ))}
//         </ul>
//       )}
//       {error && <p style={{ color: "red" }}>에러 발생: {error}</p>}
//     </div>
//   );
// };

// export default UserTodoList;

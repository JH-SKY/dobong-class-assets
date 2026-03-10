import React from "react";

const StudentList = () => {
  const users = [
    { id: 1, name: "김철수", grade: "A" },
    { id: 2, name: "이영희", grade: "B+" },
    { id: 3, name: "박동수", grade: "A+" },
    { id: 4, name: "최미나", grade: "B" },
  ];
  return (
    <div>
      <h2>학생 목록</h2>
      <br />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} (성적 : {user.grade})
          </li>
        ))} 
      </ul>
    </div>
  );
};

export default StudentList;

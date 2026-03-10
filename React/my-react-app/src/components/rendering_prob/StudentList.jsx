import React from "react";

const StudentList = () => {
  const users = [
    { id: 1, name: "김철수", grade: "A" },
    { id: 2, name: "이영희", grade: "B+" },
    { id: 3, name: "박동수", grade: "A+" },
    { id: 4, name: "최미나", grade: "B" },
  ];
  return (
    <>
      <div>StudentList</div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            {user.name} (성적: {user.grade})
          </div>
        );
      })}
      ;
    </>
  );
};

export default StudentList;

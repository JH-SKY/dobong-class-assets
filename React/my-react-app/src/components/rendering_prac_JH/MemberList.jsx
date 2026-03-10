import React from "react";

const MemberList = () => {
  const members = [
    { id: 1, name: "김철수", role: "admin", isActive: true },
    { id: 2, name: "이영희", role: "user", isActive: true },
    { id: 3, name: "박동수", role: "user", isActive: false },
    { id: 4, name: "최미나", role: "admin", isActive: true },
    { id: 5, name: "정수빈", role: "user", isActive: false },
  ];
  const sortedMembers = [...members].sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") {
      return -1; // a가 admin이면 b보다 먼저 오도록
    }
    if (a.role !== "admin" && b.role === "admin") {
      return 1; // b가 admin이면 a보다 뒤에 오도록
    }
    return 0; // 같은 역할일 경우 순서 유지
  });
  return (
    <>
      {sortedMembers.map((member) => (
        <div
          key={member.id}
          className="card"
          style={{ backgroundColor: member.isActive ? "#e8f5e9" : "#eeeeee" }}
        >
          {member.name} {member.role === "admin" ? "관리자" : "일반 회원"}{" "}
          {!member.isActive && (
            <span className="text-gray-400 opacity-70 italic text-sm">
              (비활성 계정)
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default MemberList;

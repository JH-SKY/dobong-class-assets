import React from "react";
import Member from "./Member";

const MemberList = () => {
  const members = [
    { id: 1, name: "김철수", role: "admin", isActive: true },
    { id: 2, name: "이영희", role: "user", isActive: true },
    { id: 3, name: "박동수", role: "user", isActive: false },
    { id: 4, name: "최미나", role: "admin", isActive: true },
    { id: 5, name: "정수빈", role: "user", isActive: false },
    { id: 6, name: "허허", role: "", isActive: false },
  ];
  const sortedMember = members.sort((a, b) => {
    return a.role === "admin" ? -1 : 1;
  });

  return (
    <>
      <div>MemberList</div>;
      <ul>
        <li>김철수</li>
        <li>이영희</li>
        {sortedMember.map((member) => {
          //   return <li>{member.name}</li>;
          return <Member member={member} />;
        })}
        {/* {sortedMember.map((member) => {
          return (
            <li
              key={member.id}
              className={`${member.isActive ? "bg-[#e8f5e9]" : "bg-[#eeeeee]"} p-4 m-4 rounded-lg`}
            >
              <span className="text-lg font-bold">{member.name}</span>
              <span className="text-sm text-gray-500 ml-3">
                {member.role === "admin"
                  ? "관리자"
                  : member.role === "user"
                    ? "일반 회원"
                    : "회원아님"}
              </span>
              {!member.isActive && (
                <span className="text-sm text-gray-300 ml-3">비활성계정</span>
              )}
            </li>
          );
        })} */}
      </ul>
    </>
  );
};

export default MemberList;

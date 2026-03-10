import React from "react";

const Member = ({ member }) => {
  //   아래의 삼항연산자 대신 이것을 활용할 수 있음.
  //   const roleMapping = {
  //     admin: "관리자",
  //     user: "일반 회원",
  //   };

  //   roleMapping[member.role]

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
      {/* <span> {!member.isActive && "비활성계정"}</span> */}
      {!member.isActive && (
        <span className="text-sm text-gray-300 ml-3">비활성계정</span>
      )}
    </li>
  );
};

export default Member;

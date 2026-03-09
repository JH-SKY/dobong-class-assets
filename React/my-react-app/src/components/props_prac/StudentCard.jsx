import React from "react";

const StudentCard = ({ name, grade = 1, class_ = 1 }) => {
  return (
    <div>
      이름: {name} / 학년: {grade} / 반: {class_}
    </div>
  );
};

export default StudentCard;

import React from "react";

const Students = () => {
  const array = [
    { id: 1, name: "철수" },
    { id: 2, name: "영희" },
    { id: 3, name: "동수" },
  ];

  // array2처럼 변수에 넣지 않고
  // 맨 아래의 코드처럼 바로 jsx내부에서 사용하는게 보편적이다.
  const array2 = array.map((el) => {
    return (
      <div key={el.id}>
        <span>id : {el.id}</span>
        <span> name : {el.name}</span>
      </div>
    );
  });
  return (
    <>
      <div className="card">
        <div>
          <span>id : {array[0].id}</span>
          <span> name : {array[0].name}</span>
        </div>
        <div>
          <span>id : {array[1].id}</span>
          <span> name : {array[1].name}</span>
        </div>
        <div>
          <span>id : {array[2].id}</span>
          <span> name : {array[2].name}</span>
        </div>
      </div>
      <br />
      <div className="card">{array2}</div>
      <br />
      <div className="card">
        {array.map((el) => {
          return (
            <div key={el.id}>
              <span>id : {el.id}</span>
              <span> name : {el.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Students;

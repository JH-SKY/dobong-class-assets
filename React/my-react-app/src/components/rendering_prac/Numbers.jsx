import React from "react";

const Numbers = () => {
  const array = [1, 2, 3, 4, 5];

  // 우리가 만들고 싶은 형태
  // key를 넣어줘야 함.
  const array2 = [<li>1</li>, <li>2</li>, <li>3</li>, <li>4</li>, <li>5</li>];

  // 만들기 위해서 map을 활용합니다.
  const array3 = array.map((el) => <li key={el}>{el}</li>);
  return (
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <br />
      {array2}
      <br />
      {array3}
      <br />
      {array.map((el) => (
        <li key={el}>{el}</li>
      ))}
    </ul>
  );
};

export default Numbers;

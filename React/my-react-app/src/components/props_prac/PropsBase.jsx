import React from "react";
import ParentComponent from "./ParentComponent";
import Greeting from "./Greeting";
import UserCard from "./UserCard";
import StudentCard from "./StudentCard";
import BookCard from "./BookCard";

const PropsBase = () => {
  const user = {
    name: "영희",
    age: 23,
    job: "디자이너",
  };

  const book = {
    title: "리액트를 다루는 기술",
    author: "김리액트",
    price: 32000,
    company: "출판",
  };

  return (
    <>
      <div>PropsBase</div>
      {/* <ParentComponent /> */}

      <hr />

      <Greeting name="민수" />
      <Greeting name="수진" />

      <hr />

      <UserCard name="철수" age={25} job="개발자" />
      <UserCard {...user} />

      <hr />

      <StudentCard name="민수" grade={1} class_={3} />
      <StudentCard name="수진" grade={2} class_={5} />
      <StudentCard name="길동" />

      <hr />

      <BookCard book={book} />
      <BookCard book={{ ...book, title: "패스트에이피아이" }} />
      <BookCard book={{ ...book, title: "CSS 책이야" }} />
    </>
  );
};

export default PropsBase;

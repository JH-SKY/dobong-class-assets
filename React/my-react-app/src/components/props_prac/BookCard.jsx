import React from "react";

const BookCard = ({ book }) => {
  
  return (
    <div className="card">
      <div>제목 : {book.title}</div>
      <div>저자 : {book.author}</div>
      <div>가격 : {book.price}</div>
      <div>출판사 : {book.company}</div>
    </div>
  );
};

export default BookCard;

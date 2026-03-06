import React from 'react'

const BookCard = ({book}) => {
  return (
    <div>
    제목 : {book.title}<br />
    저자: {book.저자}<br />
    가격: {book.price}<br />
    출판사: {book.출판사}
    </div>
  )
}

export default BookCard
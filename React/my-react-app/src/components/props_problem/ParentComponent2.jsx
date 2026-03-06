import React from 'react'
import Greeting from './Greeting'
import UserCard from './UserCard'
import StudentCard from './StudentCard'
import BookCard from './BookCard'

export const ParentComponent = () => {
  const lst1 = [{name : '철수', age : 23, job : '개발자'},{name : '영희', age : 23, job : '디자이너'}]
  const book = {title : '리액트를 다루는 기술', 저자 : '김리액트 ',price : 32000,  출판사 : '출판'}
  return (
    <>
    <div>ParentComponent</div>
    <Greeting name="민수" />
    <Greeting name="수진" />
    <hr />
    <UserCard user = {lst1[0]} />
    <UserCard user = {lst1[1]} />
    <hr />
    <StudentCard name="민수" 학년={1} 반 = {3} />
    <StudentCard name="수진" 학년={2} 반 = {5} />
    <StudentCard name="길동" />
    <hr />
    <BookCard book={book}/>

  </>
  )
}
export default ParentComponent
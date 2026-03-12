import React from "react";
import Profile from "./Profile";
import SignupForm from "./SignupForm";
import TodoList from "./TodoList";
import TodoListAdv from "./TodoListAdv";
import Container from "./Container";
import Counter from "./Counter";
const StateAdvBase = () => {
  return (
    <>
      <div>StateAdvBase</div>
      <Profile />
      <SignupForm />
      <TodoList />
      <TodoListAdv />
      <Container />
      <Counter />
    </>
  );
};

export default StateAdvBase;

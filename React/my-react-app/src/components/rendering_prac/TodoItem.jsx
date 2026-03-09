const TodoItem = ({ text, isDone }) => {
  return <p className={isDone ? "done" : ""}>{text}</p>;
  // 아래는 return  아래 있기 때문에 렌더링이 안됨.
  <p className="done">{text}</p>;
  <p className="">{text}</p>;

  <span className={`todo-item ${isDone ? "done" : ""}`}>{text}</span>;
  <span className={`todo-item done`}>{text}</span>; //true일 때
  <span className={`todo-item `}>{text}</span>; // false일 때

  // <span
  //   className={`todo-item ${isDone ? "done" : ""} ${isImportant ? "important" : ""}`}
  // >
  //   {text}
  // </span>;
};

export default TodoItem;

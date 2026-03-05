// filter

const todos = [
  { task: "숙제하기", priority: "high", completed: false },
  { task: "운동하기", priority: "medium", completed: true },
  { task: "독서하기", priority: "high", completed: false },
  { task: "청소하기", priority: "low", completed: false },
];

// 완료한 애들만 보기.
const completedTodos = [];
for (const todo of todos) {
  if (todo.completed) {
    // console.log(todo);
    completedTodos.push(todo);
  }
}
console.log(completedTodos);
console.log();

const completedTodos2 = todos.filter((todo, idx, arr) => todo.completed);

console.log(completedTodos2);
console.log();

// 완료하지 못한 애들만 뽑기
const incompleteTodos = todos.filter((todo) => !todo.completed);

console.log(incompleteTodos);
console.log();

// priority가 high인 애들만 뽑기.
const highPriorityTodos = todos.filter((todo) => todo.priority === "high");

console.log(highPriorityTodos);
console.log();

//////////////////////////////////////////////////////////////////////
// foreach

let todos = ["숙제하기", "운동하기", "독서하기"];

for (const element of todos) {
  console.log(element);
}

todos.forEach((todo, index, array) => {
  console.log(`${index + 1}. ${todo}`);
});

//////////////////////////////////////////////////////////////////////
// map

// python
// arr = map(int, input().split())
// input = "1 2 3 4"
// input.split() = ["1", "2", "3", "4"]

// map(int, input().split())
// map(int, ["1", "2", "3", "4"])

const newTodos = todos.map((el, index, array) => {
  return `${el} 완료`;
});

console.log(newTodos);

// 2번. 변수 numbers에 1, 2, 3 배열을 할당한다.
// 반복문을 활용해 각 원소에 2를 곱한 값을 담은 새로운 배열 newNumbers를 만들어 출력한다.
console.log("2번 문제");

let numbers = [1, 2, 3];
const newNumbers = [];

for (const num of numbers) {
  newNumbers.push(num * 2);
}

const newNumbers2 = numbers.map((el) => el * 2);

console.log(newNumbers);
console.log(newNumbers2);

console.log("-----------------");

// filter
console.log("-----------------------------filter-----------------------------");

todos = [
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

console.log("-----------------------------reduce-----------------------------");

numbers = [1, 2, 3, 4, 5, 6];

// 더하고 싶다.
let total = 0;

for (const num of numbers) {
  total += num;
}

const sumNumbers = numbers.reduce((prev, curr) => {
  return prev + curr;
}, 0);

console.log(sumNumbers);

// 곱하고 싶다.
let multi = 1;

for (const num of numbers) {
  multi *= num;
}

const multiNumbers = numbers.reduce((prev, curr) => prev * curr, 1);

todos = [
  { task: "숙제하기", timeSpent: 2 },
  { task: "운동하기", timeSpent: 1 },
  { task: "독서하기", timeSpent: 3 },
  { task: "청소하기", timeSpent: 1 },
];

let totalTimeSpent = 0;
for (const todo of todos) {
  totalTimeSpent += todo.timeSpent;
}

const totalTime = todos.reduce((acc, todo) => {
  console.log(`누적 시간: ${acc}, 현재 작업 시간: ${todo.timeSpent}`);
  return acc + todo.timeSpent;
}, 0); // 초기값 0

console.log(`총 소요 시간: ${totalTime}시간`);

console.log("-----------------------------sort-----------------------------");

// // python
// lst = [
//     [1, 2],
//     [5, 1],
//     [3, 4],
//     [4, 0]
// ]
// lst.sort()

// lst.sort(key=lambda x : x[1])

// def func(x):
//     return x[1]
// lst.sort(key=func)

numbers = [1, 5, 2, 7, 4, 3];

console.log(numbers.sort());

// numbers.sort((a, b) => {
//     return 양수 -> a가 뒤야.
//     return 음수 -> b가 뒤야.
// })

const sortedNumbers = numbers.sort((a, b) => {
  return a - b;
});
console.log(sortedNumbers);

const sortedNumbers2 = numbers.sort((a, b) => {
  return b - a;
});
console.log(sortedNumbers2);

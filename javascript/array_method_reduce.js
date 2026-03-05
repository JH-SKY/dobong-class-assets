// reduce

const numbers = [1, 2, 3, 4, 5, 6];

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

const todos = [
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

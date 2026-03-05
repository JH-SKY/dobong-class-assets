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

const numbers = [1, 2, 3];
const newNumbers = [];

for (const num of numbers) {
  newNumbers.push(num * 2);
}

const newNumbers2 = numbers.map((el) => el * 2);

console.log(newNumbers);
console.log(newNumbers2);

console.log("-----------------");

// 선언식
function func() {}

// 표현식
const func2 = function () {};

// 화살표 함수.
const func3 = () => {};

// 함수의 인자로 다른 함수를 전달할 수 있다.
function applyOperation(func, number) {
  return func(number);
}

const double = (x) => x * 2;
const square = (x) => x * x;

console.log(applyOperation(double, 5)); // 10
console.log(applyOperation(square, 5)); // 25

// 함수의 반환값이 함수일 수 있다.

function createMultiplier(multiplier) {
  return (number) => {
    return number * multiplier;
  };
}

const double2 = createMultiplier(2);
const triple2 = createMultiplier(3);

// const func = createMultiplier(10);
const multiplier = (number) => {
  return number * 10;
};

console.log(double2(5)); // 2 * 5 = 10
console.log(triple2(5)); // 3 * 5 = 15
console.log(multiplier(5));

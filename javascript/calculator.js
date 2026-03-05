// calculator.js

// 계산기 객체
const Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error("0으로 나눌 수 없습니다");
    }
    return a / b;
  },
};

export default Calculator;

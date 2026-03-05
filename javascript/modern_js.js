// 단축 프로퍼티

const name = "홍길동";
const name2 = "임꺽정";
const age = 18;

const obj = {
  name: name,
  age: age,
};
console.log(obj);

const obj2 = {
  name,
  age,
  name2,
};
console.log(obj2);

// 구조분해할당
console.log();
console.log("구조분해할당");

const post = {
  title: "제목",
  content: "내용",
  author: "작성자",
};

// const title = post.title;
// const content = post.content;
// const author = post.author;

const { title, content } = post;
console.log(title);
console.log(content);

// 계산된 속성명
console.log();
console.log("계산된 속성명");

// key의 위치에 변수를 넣고 싶다.
const key = "name";

const obj3 = {
  [key]: "홍길동",
  key: "value",
};

console.log(obj3);

// 펼침 연산자
console.log();
console.log("펼침 연산자");

function func(...params) {
  console.log(params);
}

func(1, 2, 3, 4, 5, 6, 7, 8);

const arr1 = [1, 2, 3, 4];
const arr2 = [5, ...arr1, 6];
console.log(arr2);

const obj4 = { name: "홍길동", age: 25 };

const obj5 = {
  ...obj4,
  gender: "M",
};

console.log(obj5);

// 옵셔널 체이닝
console.log();
console.log("옵셔널 체이닝");

const obj6 = { name: "홍길동", age: 25 };

console.log(obj6.name);
console.log(obj6.gender);

console.log(obj6.name.firstName);

// 객체에 대해서 없는 key에 접근하면 undefined
// undefined에 대해 key에 접근하면 에러가 납니다.
// console.log(obj6.gender.detail);
console.log(obj6.gender?.detail);

console.log(obj6.name);
console.log(obj6?.name);

// Nullish 병합 연산자
console.log();
console.log("Nullish 병합 연산자");

const userInput = "입력받음";
// const userInput = null;

const userUserInput = userInput ?? "아직 입력 안받음";

console.log(userUserInput);

// truthy / falsy
console.log();
console.log("truthy / falsy");

const emptyArray = [];

if (emptyArray) {
  console.log("빈 리스트지만 실행이 된다.");
}

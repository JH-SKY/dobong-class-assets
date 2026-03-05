const first = () => {
  console.log("동기 작업 1");
};

const second = () => {
  setTimeout(() => {
    console.log("비동기 작업 1");
  }, 0);
};

const third = () => {
  setTimeout(() => {
    console.log("비동기 작업 2");
  }, 1000);
};

const fourth = () => {
  console.log("동기 작업 2");
};

first();
second();
third();
fourth();

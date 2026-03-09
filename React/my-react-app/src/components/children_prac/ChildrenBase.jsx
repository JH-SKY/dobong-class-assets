import React from "react";
import Card from "./Card";
import Layout from "./Layout";
import Button from "./Button";
import Card2 from "./Card2";

const ChildrenBase = () => {
  return (
    <>
      <div>ChildrenBase</div>
      <Card />
      <Card>내용물을 채워넣는겁니다.</Card>
      <Card title="하하">
        <h1>안녕하세요</h1>
        <div>jsx같은 것도 전달할 수 있습니다.</div>
      </Card>
      <hr />
      <Layout>변경될 메인 페이지에 대한 내용을 넣는겁니다.</Layout>
      <Layout>
        <h1>내용이야</h1>
        <p>글씨야</p>
      </Layout>
      <button>여기에 내용을 적습니다.</button>
      <br />
      <Button backgroundColor="blue">확인</Button>
      <Button backgroundColor="red">취소</Button>
      <Button backgroundColor="grey">보류</Button>
      <Button backgroundColor="pink">1억년</Button>
      <hr />
      <Card2 title="공지사항">
        <p>내일은 휴무입니다.</p>
      </Card2>
      <Card2 title="이벤트">
        <p style={{ fontWeight: "bold" }}>할인 행사 진행 중!</p>
        <p>신규 회원 가입 이벤트!</p>
      </Card2>
    </>
  );
};

export default ChildrenBase;

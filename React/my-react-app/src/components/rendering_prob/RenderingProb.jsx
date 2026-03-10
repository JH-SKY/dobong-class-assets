import React from "react";
import WeatherStatus from "./WeatherStatus";
import NoticeBoard from "./NoticeBoard";
import StudentList from "./StudentList";
import TodoList from "./TodoList";
import MemberList from "./MemberList";
const RenderingProb = () => {
  return (
    <>
      <div>RenderingProb</div>
      <WeatherStatus />
      <WeatherStatus isRaining={true} temperature={10} />
      <br />
      <NoticeBoard />
      <NoticeBoard
        hasNewMessage={false}
        isMember={false}
        errorMessage="에러임"
      />
      <br />
      <StudentList />
      <br />
      <TodoList />
      <MemberList />
    </>
  );
};

export default RenderingProb;

import React from "react";
import ChildComponent from "./ChildComponent";
import UserProfile from "./UserProfile";
import UserProfileObject from "./UserProfileObject";

const ParentComponent = () => {
  // let people
  // const response = await axios.get()
  // people = response.data

  const people = [
    {
      name: "철수",
      age: 18,
    },
    {
      name: "맹구",
      age: 28,
    },
    {
      name: "짱구",
      age: 38,
    },
  ];
  const person = {
    name: "객체에서의 이름",
    age: 10,
  };
  return (
    <div>
      ParentComponent
      <UserProfileObject person={person} />
      <UserProfileObject
        person={{
          name: "객체에서의 이름",
          age: 10,
        }}
      />
      <br />
      <UserProfile {...person} />
      <UserProfile name="훈이" age={38} />
      <UserProfile name="훈이" age="38" />
      <UserProfile />
      <UserProfile name="유리" />
      <br />
      <ChildComponent name="철수" age={18} />
      <ChildComponent name="맹구" age={28} />
      <ChildComponent name={people[0].name} age={people[0].age} />
      <ChildComponent name={people[1].name} age={people[1].age} />
      <ChildComponent name={people[2].name} age={people[2].age} />
    </div>
  );
};

export default ParentComponent;

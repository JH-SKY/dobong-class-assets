import React from "react";

const UserCard = ({ name, age, job }) => {
  //   const { name, age, job } = props;

  //   const name = props.name
  //   const age = props.age
  //   const job = props.job
  return (
    <div className="card">
      {name} / {age} / {job}
    </div>
  );
};

export default UserCard;

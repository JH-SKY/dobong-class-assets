import React from 'react'

const UserCard = (props) => {
  return (
    <div>
      {props.user.name}/
      {props.user.age}/
      {props.user.job}
    </div>
  )
}

export default UserCard
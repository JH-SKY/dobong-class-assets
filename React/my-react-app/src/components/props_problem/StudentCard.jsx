import React from 'react'

const StudentCard = ({name, 학년 = 1, 반 = 1}) => {
  return (
    <div>
      이름 : {name} / 학년: {학년} / 반: {반}
    </div>
  )
}

export default StudentCard
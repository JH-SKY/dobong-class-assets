const AdminLink = ({ isAdmin }) => {
  return (
    <div className="card">
      <p>현재 권한 : {isAdmin ? "관리자" : "일반 사용자"}</p>

      {isAdmin && <a>관리 페이지 이동</a>}
    </div>
  );
};

export default AdminLink;

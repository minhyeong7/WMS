import { useNavigate } from "react-router-dom";


const DashboardPage = () => {

  
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
  };
 

  return (
    <div>
      <h2>{username}님 환영합니다</h2>
      <button onClick={handleLogout}>로그아웃</button>
      <h1>대쉬보드 페이지</h1>
      
      
    </div>
  );
};

export default DashboardPage;

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";


const Sidebar = () => {
  const location = useLocation();
  const navigate =useNavigate();
  const username =localStorage.getItem("username");

  const menuClass = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  
  const handleLogout = () => {
    // 로컬스토리지에 저장된 값들 초기화
    localStorage.removeItem("username");
    localStorage.removeItem("isLogin");
    // navigate를 이용해서 로그인창으로 이동
    alert("로그아웃이 완료되었습니다")
    navigate("/login", {replace : true}) /* replace = 현재 페이지를 새페이지로 교체해서 뒤로가기 방지
                                          하지만 라우팅에서 ProtectedRoute의 검사하기 때문에 쓰든안쓰든 무의미  */ 
  }

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* 사이드바 */}
      <aside className="w-72 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-700">
            WMS 물류관리
          </h1>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <Link to="/" className={menuClass("/")}>
             대시보드
          </Link>

          <Link to="/products" className={menuClass("/products")}>
             제품리스트 조회
          </Link>

          <Link to="/practice" className={menuClass("/practice")}>
             테스트 페이지
          </Link>
        </nav>

        <div className="border-t p-4 flex items-center justify-between bg-gray-50">
          <span className="text-lg font-medium text-gray-700 ">
          {username} 님
          </span>

          <button
            onClick={handleLogout}
            className="px-3 py-1 text-lg font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 영역 */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;

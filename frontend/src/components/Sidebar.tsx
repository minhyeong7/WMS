import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuClass = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-700">
            WMS 물류관리
          </h1>
        </div>

        <nav className="p-4 space-y-2">
          <Link to="/" className={menuClass("/")}>
             대시보드
          </Link>

          <Link to="/products" className={menuClass("/products")}>
             제품리스트 조회
          </Link>
        </nav>
      </aside>

      {/* 메인 영역 */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("qwer1234");
  const navigate = useNavigate();

  const users: User[] = [
    { username: "admin", password: "qwer1234" },
    { username: "user1", password: "1234" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("username", foundUser.username);
      alert(foundUser.username + "님 안녕하세요!");
      navigate("/");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8">
        
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          WMS 로그인
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* 아이디 */}
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* 버튼 */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 
                       text-white font-semibold transition duration-200 shadow-lg"
          >
            로그인
          </button>
        </form>

        {/* 하단 텍스트 */}
        <p className="text-gray-400 text-sm text-center mt-6">
          물류관리 시스템 관리자 페이지
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 하드코딩 계정
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("username", username);
      navigate("/", { replace: true });
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>로그인</h2>

      <input
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginPage;

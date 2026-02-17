import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface User{
    username:string;
    password:string;
}

const LoginPage = () =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();


    
    const users : User[] = [
        {username:"admin", password:"qwer1234"},
        {username:"user1", password:"1234"},
    ];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const foundUser = users.find(
            (user) => user.username === username && user.password === password
        );

        if(foundUser){
            localStorage.setItem("isLogin","true");
            localStorage.setItem("username",foundUser.username);
            alert(foundUser.username + "님 안녕하세요!")
            navigate("/");
        }else{
            alert("아이디 또는 비밀번호가 틀렸습니다");
        }
    }

    return(
        <div>
            <form onSubmit={handleLogin}>
                <h2>로그인</h2>

                <div>
                    <input 
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>

                <div>
                    <input 
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                </div>

                <button type="submit">로그인</button>
            </form>
            
        </div>
    )

}

export default LoginPage;
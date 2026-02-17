import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 */}
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

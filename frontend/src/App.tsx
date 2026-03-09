import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardPage from "./pages/DashboardPage"
import ProductPage from "./pages/ProductPage"
import Sidebar from "./components/Sidebar"
import Practice from "./pages/Practice"
import StockMovePage from "./pages/StockMovePage"
import StockHistoryPage from "./pages/StockHistoryPage"




function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 */}
        <Route path="login" element={<LoginPage />} />

        {/* 로그인 후 접근 가능 페이지 */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Sidebar />}>
            <Route path="/" element={<DashboardPage />}/>
            <Route path="/products" element={<ProductPage />} />
            <Route path="practice" element={<Practice />} />
            <Route path="stock/:id" element={<StockMovePage />} />
            <Route path="/history" element={<StockHistoryPage/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

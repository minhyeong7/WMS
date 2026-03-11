import type { DashboardResponseDto } from "../types/DashboardResponseDto";
import { api } from "./axios";


// 대시보드
const getDashboard = async() : Promise<DashboardResponseDto> => {
    const res = await api.get<DashboardResponseDto>("/api/products/dashboard");

    return res.data;
}

export default getDashboard;
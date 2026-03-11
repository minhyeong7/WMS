import type { StockHistoryRequest } from "../types/StockHistoryRequest";
import { api } from "./axios";


// 반입 반출 
export const moveStock = async(
    id : number,
    type: "IN" | "OUT",
    data: StockHistoryRequest
) => {
    const url = type === "IN" ? `/api/products/${id}/in` : `/api/products/${id}/out`;
    const res = await api.post(url,data);

    console.log(`재고 ${type}`, res);

    return res.data;
}

// 이력 조회
export const getHistory =async (params = {}) => {
    const res = await api.get("/api/products/history", {params});

    console.log("이력 조회",res)

    return res.data;
}
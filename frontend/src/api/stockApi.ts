import type { StockHistoryRequest } from "../types/StockHistoryRequest";
import { api } from "./axios";



// 반입
export const stockIn = async(id:number,data:StockHistoryRequest)  => {
    const res = await api.post(`/products/${id}/in`,data);

    console.log("반입:",res)


    return res.data;
}

// 반출
export const stockOut = async(id:number,data:StockHistoryRequest) => {
     const res = await api.post(`/products/${id}/out`,data);

     console.log("반출:",res)

    return res.data;
}

// 이력 조회
export const getHistory =async (params = {}) => {
    const res = await api.get("/products/history", {params});

    console.log("이력 조회",res)

    return res.data;
}
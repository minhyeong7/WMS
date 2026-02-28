import { api } from "./axios";
import type { ProductResponse } from "../types/ProductResponse";
import type { ProductRequest } from "../types/ProductRequest";
import type { DeleteProductResponse } from "../types/DeleteProductResponse";


// // 상품 전체 조회
// export const getProducts = async ():Promise<ProductResponse[]> => {
//     const res = await api.get<ProductResponse[]>("/products");
//     return res.data;
// }

// 상품 조회 (필터링, 검색, 정렬)
export const getProducts = async (params = {}) => {
    const res = await api.get("/products",{params});
    

    return res.data;
}

// 상품 단일 조회
export const getProduct = async (id:number) : Promise<ProductResponse> => {
    const res = await api.get<ProductResponse>(`/products/${id}`);

    return res.data;
}


// 타입 위치	  역할
// data	        입력 타입
// api.post<T>	응답 body 타입
// Promise<T>	함수 반환 타입

// 상품 등록  
export const createProduct = async (data : ProductRequest)  : Promise<ProductResponse> => {
    const res = await api.post<ProductResponse>("/products",data);

    return res.data;
}

// 상품 수정
export const updateProduct = async (id:number, data : ProductRequest) :Promise<ProductResponse> => {
    const res = await api.put<ProductResponse>(`/products/${id}`,data);

    return res.data
}

// 상품 삭제
export const deleteProduct = async (id : number) : Promise<DeleteProductResponse> => {
    const res = await api.delete<DeleteProductResponse>(`/products/${id}`);

    return res.data;
}
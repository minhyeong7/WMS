import {  useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { moveStock } from "../api/stockApi";
import type { StockHistoryRequest } from "../types/StockHistoryRequest";
import { getProduct } from "../api/productApi";



const StockMovePage = () => {
    const {id} = useParams(); // product id 파라미터 가져오기 위함
    const [searchParams] = useSearchParams(); // url에 있는 type 파라미터 생성위함
    const type = searchParams.get("type"); // IN or OUT
    const [quantity, setQuantity] = useState<number>(0); // 수량
    const [stock,setStock] = useState<number>(0); // 현재 재고수량
    
    const navigate = useNavigate();

    // 반입 및 반출 처리버튼
    const handleSubmit = async () => {

        if (quantity <= 0) {
            alert("수량은 0보다 커야 합니다.");
            return;
        }

        if(type === "OUT" && quantity>stock ){
            alert("현재 재고수량보다 많습니다");

            return;
        }

        try {
            const data: StockHistoryRequest = {
                movementQuantity: quantity
            };

            await moveStock(Number(id), type as "IN" | "OUT", data);

            alert("처리 완료");
            navigate("/products");

        } catch (error) {
            console.error("재고 이동 실패:", error);
            alert("처리 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        const getStock = async () => {
            try{
                const res = await getProduct(Number(id));
                setStock(res.currentStock);
            }catch(error){
                console.error("재고 단일 조회 실패",error);
                alert("재고 단일 조회 중 오류가 발생했습니다");
            }
        }
        
        getStock();
    },[])



    return(
        
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4 ">
                {type === "IN" ? "재고 반입" : "재고 반출"}
            </h1>

            <div>
                <div>
                    <label className="block mb-1">상품 ID</label>
                    <input 
                        type="text" 
                        value={id}
                        disabled
                        className="border p-2 rounded w-full"
                    />
                        
                </div>

                <div>
                    <label className="block mb-1">현재 재고 수량</label>
                    <input 
                        type="number" 
                        value={stock}
                        disabled
                        className="border p-2 rounded w-full"
                    />
                        
                </div>

                <div>
                    <label className="block mb-1">수량</label>
                    <input 
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))} //e.target.value 의 값이 string이라 Number로 형변환해줌   
                        className="border p-2 rounded w-full"
                    />
                </div>
                
                <button
                    onClick={handleSubmit}
                    className={`px-4 py-2 rounded text-white 
                        ${type === "IN" 
                            ? "bg-green-500 hover:bg-green-600"
                            : " bg-red-500 hover:bg-red-600"}`}
                >
                    {type === "IN" ? "반입 처리" : "반출 처리"}
                </button>
            </div>

        </div>
        

    )
}

export default StockMovePage;



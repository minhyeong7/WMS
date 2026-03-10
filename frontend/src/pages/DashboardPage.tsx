import { useEffect, useState } from "react";
import type { DashboardResponseDto } from "../types/DashboardResponseDto";
import getDashboard from "../api/dashboardApi";



const DashboardPage = () => {

   
  // 데이터
  const [data,setData] = useState<DashboardResponseDto | null>(null); // 타입은 둘중 하나

  useEffect( () => {
    const fetchDashboard = async () => {
      try{
         const res = await getDashboard();
         setData(res);
        
      }catch(error){
        console.error("대쉬보드 조회 실패:",error);
        alert("대쉬보드 조회 중 오류가 발생했습니다");
      }
    }


    fetchDashboard();
  },[])

  // 데이터가 없을 경우
  if(!data){
    return <div className="p-6">로딩중...</div>
  }
 

  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-6">대쉬보드</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">오늘 반입</p>
          <p className="text-xl font-bold">{data.todayInCount}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">오늘 반출</p>
          <p className="text-xl font-bold">{data.todayInCount}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">총 재고</p>
          <p className="text-xl font-bold">{data.nowStockCount}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">등록된 물류</p>
          <p className="text-xl font-bold">{data.totalProductCount}</p>
        </div>

      </div>
      
      
    </div>
  );
};

export default DashboardPage;

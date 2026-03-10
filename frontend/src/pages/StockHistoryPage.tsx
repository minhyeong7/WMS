import { useEffect, useState } from "react";
import { getHistory } from "../api/stockApi";
import type { StockHistoryResponse } from "../types/StockHistoryResponse";



// Todo
// 키워드 검색창 만들 수 있으면 만들기 


const StockHistoryPage = () => {

    const [loading,setLoading] = useState(false); // 로딩 유무
    const [historys,setHistory] = useState<StockHistoryResponse[]>([]); // 데이터 
    const [filter, setFilter] = useState(""); // 필터링 반입 반출
    const [sortColumn,setSortColumn] = useState("id"); // 정렬 기준
    const [sortDir,setSortDir] = useState("asc"); // 정렬 방향
    const [historyCount,setHistoryCount] = useState(0); // 데이터 개수
    const [page,setPage] = useState(0);

    const pageSize = 10;
    const totalPages = Math.ceil(historyCount / pageSize);


    // 데이터 조회 기능
    const fetchHistory = async(customPage : number = page) => {  /*
        customPage : number = page  해당 파라미터는 인자 값 없을시 page로 */
        setLoading(true); // 데이터 조회 시작시 로딩


        try {
            const result = await getHistory({
                filter,
                sortColumn,
                sortDir,
                page: customPage,
                size: pageSize
            });
            setHistory(result.data);
            setHistoryCount(result.totalCount);
            setPage(customPage); // ????
        } catch (error) {
            console.error("제품 이력 조회 실패",error);
        }finally{
            setLoading(false); // 데이터 조회 종료시 로딩false
        }    


        }


    // 최초 렌더링 시 실행
    useEffect(() => {
        fetchHistory(0);
    },[])

    // 날짜 포맷 (오전/오후 제거)
    const formatDate = (dateString: string) => {
        const d = new Date(dateString);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hour = String(d.getHours()).padStart(2, "0");
        const minute = String(d.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day} ${hour}:${minute}`;
    };

    
    // 숫자 페이지 그룹 (5개씩)
    const pageGroupSize = 5;
    const currentGroup = Math.floor(page / pageGroupSize);
    const startPage = currentGroup * pageGroupSize;
    const endPage = Math.min(startPage + pageGroupSize, totalPages);

    const pageNumbers = Array.from(
        { length: endPage - startPage },
        (_, i) => startPage + i
    );

    return(
       <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">반입 반출 이력</h2>

            {/* 검색 / 정렬 */}
            <div className="flex flex-wrap gap-3 items-center text-sm">
                <select
                 value={filter}
                 onChange={(e) => setFilter(e.target.value)}
                 className="border rounded-md px-3 py-2 text-sm"
                >
                    <option value="">전체</option>
                    <option value="IN">반입</option>
                    <option value="OUT">반출</option>
                </select>
               <select
                value={sortColumn}
                onChange={(e) => setSortColumn(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
                >
                <option value="id">ID</option>
                <option value="movement_quantity">재고 수량</option>
                <option value="created_at">날짜순</option>
               </select>
               
               <select 
                className="border rounded-md px-3 py-2 text-sm"
                value={sortDir}
                onChange={(e) => setSortDir(e.target.value)}
                >
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
               </select>

               <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm" onClick={()=>fetchHistory(0)}>조회</button>

               <p>
                총 개수 : <span className="font-bold">{historyCount}</span>
               </p>
            </div>

            {/* 테이블 */}
            {loading ? (<p>로딩중...</p>) :(
                <>
                 <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse text-sm">
                        <thead className="bg-gray-100 text-center">
                            <tr>
                                <th className="px-4 py-3 border-b">ID</th>
                                <th className="px-4 py-3 border-b">물류ID</th>
                                <th className="px-4 py-3 border-b">수량</th>
                                <th className="px-4 py-3 border-b">재고이동</th>
                                <th className="px-4 py-3 border-b">생성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historys.map((history) => (
                                <tr key={history.id} className="hover:bg-gray-50 text-center">
                                    <td className="px-4 py-2 border-b">{history.id}</td>
                                    <td className="px-4 py-2 border-b">{history.productId}</td>
                                    <td className="px-4 py-2 border-b">{history.movementQuantity}</td>
                                    <td className="px-4 py-2 border-b">{history.movementType}</td>
                                    <td className="px-4 py-2 border-b">{formatDate(history.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center items-center gap-2 mt-6">

                    <button
                        disabled={page === 0}
                        onClick={() => fetchHistory(page - 1)}
                        className="px-3 py-1 border rounded-md disabled:opacity-40"
                    >
                        이전
                    </button>

                    {pageNumbers.map((num) => (
                        <button
                            key={num}
                            onClick={() => fetchHistory(num)}
                            className={`px-3 py-1 border rounded-md
                        ${page === num
                                    ? "bg-gray-800 text-white"
                                    : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            {num + 1}
                        </button>
                    ))}

                    <button
                        disabled={page >= totalPages - 1}
                        onClick={() => fetchHistory(page + 1)}
                        className="px-3 py-1 border rounded-md disabled:opacity-40"
                    >
                        다음
                    </button>

                </div>
                </>
            )}
        </div>
       </div>
    )
}


export default StockHistoryPage;
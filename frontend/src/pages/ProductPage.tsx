import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import type { ProductResponse } from "../types/ProductResponse";
import { Link} from "react-router-dom";

const ProductPage = () => {
  const pageSize = 10;

  const [products, setProducts] = useState<ProductResponse[]>([]); // 데이터 
  const [loading, setLoading] = useState(false); // 로딩 유무
  const [count, setCount] = useState(0); // 데이터 총 개수
  const [keyword, setKeyword] = useState(""); // 키워드 검색
  const [sortColumn, setSortColumn] = useState("id"); // 정렬 기준 
  const [sortDir, setSortDir] = useState("asc"); // 내림차순 오름차순
  const [page, setPage] = useState(0); // 페이지 오프셋
  

  const totalPages = Math.ceil(count / pageSize);

  // 특정 페이지로 조회하는 함수
  const fetchProducts = async (customPage: number = page) => {
    setLoading(true);
    try {
      const result = await getProducts({
        keyword,
        sortColumn,
        sortDir,
        page: customPage,
        size: pageSize
      });

      setProducts(result.data);
      setCount(result.totalCount);
      setPage(customPage); // 조회 성공 후 페이지 동기화
    } catch (error) {
      console.error("물류 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  // 최초 1회 조회
  useEffect(() => {
    fetchProducts(0);
  }, []);

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

 return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-lg p-6">

        <h2 className="text-2xl font-semibold mb-6">제품 목록</h2>

        {/* 검색 / 정렬 */}
        <div className="flex flex-wrap gap-3 items-center mb-6">

          <input
            type="text"
            placeholder="품목코드 및 물류명"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />

          <select
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="id">ID</option>
            <option value="name">물류명</option>
            <option value="price">가격</option>
            <option value="current_stock">재고</option>
            <option value="created_at">날짜순</option>
          </select>

          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>

          <button
            onClick={() => fetchProducts(0)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm"
          >
            조회
          </button>

          <p>
            총 개수 : <span className="font-bold">{count}</span>
          </p>

        </div>

        {/* 테이블 */}
        {loading ? (
          <p>로딩중...</p>
        ) : (
          <>
            <div className="overflow-x-auto">

              <table className="w-full table-fixed border-collapse text-sm">

                <thead className="bg-gray-100 text-center">
                  <tr>
                    <th className="px-4 py-3 border-b">ID</th>
                    <th className="px-4 py-3 border-b">품목코드</th>
                    <th className="px-4 py-3 border-b">물류명</th>
                    <th className="px-4 py-3 border-b">가격</th>
                    <th className="px-4 py-3 border-b">재고</th>
                    <th className="px-4 py-3 border-b">생성일</th>
                    <th className="px-4 py-3 border-b">수정일</th>
                    <th className="px-4 py-3 border-b w-40">재고이동</th>
                  </tr>
                </thead>

                <tbody>

                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 text-center"
                    >

                      <td className="px-4 py-2 border-b">
                        {product.id}
                      </td>

                      <td className="px-4 py-2 border-b">
                        {product.sku}
                      </td>

                      <td className="px-4 py-2 border-b">
                        {product.name}
                      </td>

                      <td className="px-4 py-2 border-b">
                        {product.price.toLocaleString()}
                      </td>

                      <td className="px-4 py-2 border-b">
                        {product.currentStock}
                      </td>

                      <td className="px-4 py-2 border-b">
                        {formatDate(product.createdAt)}
                      </td>

                      <td className="px-4 py-2 border-b">
                        {formatDate(product.updatedAt)}
                      </td>

                      <td className="px-4 py-2 border-b">

                        <div className="flex justify-center gap-2">

                          <Link
                            to={`/stock/${product.id}?type=IN`}
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs inline-block"
                          >
                            반입
                          </Link>

                          <Link
                            to={`/stock/${product.id}?type=OUT`}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs inline-block"
                          >
                            반출
                          </Link>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center items-center gap-2 mt-6">

              <button
                disabled={page === 0}
                onClick={() => fetchProducts(page - 1)}
                className="px-3 py-1 border rounded-md disabled:opacity-40"
              >
                이전
              </button>

              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => fetchProducts(num)}
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
                onClick={() => fetchProducts(page + 1)}
                className="px-3 py-1 border rounded-md disabled:opacity-40"
              >
                다음
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
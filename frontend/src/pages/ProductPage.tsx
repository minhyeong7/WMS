import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import type { ProductResponse } from "../types/ProductResponse";

const ProductPage = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts({
        keyword,
        sortColumn,
        sortDir,
        page
      });

      setProducts(data);
    } catch (error) {
      console.error("상품 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  //  처음 한 번만 기본 조회
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
  <div className="p-8 bg-gray-100 min-h-screen">
    <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-lg p-6">

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        제품 목록
      </h2>

      {/*  검색 + 정렬 + 조회 */}
      <div className="flex flex-wrap gap-3 items-center mb-6">

        <input
          type="text"
          placeholder="상품명 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <select
          value={sortColumn}
          onChange={(e) => setSortColumn(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="id">ID</option>
          <option value="name">상품명</option>
          <option value="price">가격</option>
          <option value="current_stock">재고</option>
        </select>

        <select
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>

        <button
          onClick={() => {
            setPage(0);
            fetchProducts();
          }}
          className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm
                     hover:bg-gray-700 transition"
        >
          조회
        </button>
      </div>

      {/*  테이블 */}
      {loading ? (
        <p className="text-gray-600">로딩중...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 border-b">ID</th>
                  <th className="px-4 py-3 border-b">품목코드</th>
                  <th className="px-4 py-3 border-b">상품명</th>
                  <th className="px-4 py-3 border-b">가격</th>
                  <th className="px-4 py-3 border-b">재고</th>
                  <th className="px-4 py-3 border-b">생성일</th>
                  <th className="px-4 py-3 border-b">수정일</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 border-b">{product.id}</td>
                    <td className="px-4 py-2 border-b">{product.sku}</td>
                    <td className="px-4 py-2 border-b">{product.name}</td>
                    <td className="px-4 py-2 border-b">{product.price}</td>
                    <td className="px-4 py-2 border-b">{product.currentStock}</td>
                    <td className="px-4 py-2 border-b">{product.createdAt}</td>
                    <td className="px-4 py-2 border-b">{product.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*  페이징 */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => {
                if (page > 0) {
                  setPage(page - 1);
                  fetchProducts();
                }
              }}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm
                         hover:bg-gray-100 transition"
            >
              이전
            </button>

            <span className="text-gray-700 text-sm">
              {page + 1} 페이지
            </span>

            <button
              onClick={() => {
                setPage(page + 1);
                fetchProducts();
              }}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm
                         hover:bg-gray-100 transition"
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
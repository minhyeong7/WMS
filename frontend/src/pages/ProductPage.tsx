import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import type { ProductResponse } from "../types/ProductResponse";



const ProductPage = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
      const fetchProducts = async () => {
        try{
          const data = await getProducts();
          setProducts(data);
        }catch(error){
          console.error("상품 전체 조회 실패", error)
        }finally{
          setLoading(false);
        }
      }

      fetchProducts();
    },[])
    return(
      <div>
        <h2>제품 목록</h2>
        {loading ? <p>로딩중...</p> :
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>품목코드</th>
              <th>상품명</th>
              <th>가격</th>
              <th>재고</th>
              <th>생성일</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.currentStock}</td>
                <td>{product.createdAt}</td>
              </tr>
            ))}
      
          </tbody>
        </table>
        }
      </div>
      
    )
}

export default ProductPage;
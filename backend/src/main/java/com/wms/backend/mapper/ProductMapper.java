package com.wms.backend.mapper;

import com.wms.backend.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {

    // 제품 등록
    void insert(Product product);

    // 전체 조회
    List<Product> findAll();

    // 단건 조회
    Product findById(@Param("id") Long id);

    // SKU로 조회
    Product findBySku(@Param("sku") String sku);

    // 제품 수정
    void update(Product product);


    // 삭제
    void delete(@Param("id") Long id);

    // 재고 증가
    void increaseStock(@Param("id") Long id,
                       @Param("quantity") Integer quantity);

    // 재고 감소
    void decreaseStock(@Param("id") Long id,
                       @Param("quantity") Integer quantity);
}

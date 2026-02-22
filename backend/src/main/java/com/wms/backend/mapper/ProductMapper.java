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

    // 전체 조회 + 검색 + 정렬 + 페이징
    List<Product> findProducts(
            @Param("keyword") String keyword, // 검색어
            @Param("offset")  int offset, // 페이징 시작 위치
            @Param("size")    int size, // 데이터 개수
            @Param("sortColumn") String sortColumn, // 정렬 기준
            @Param("sortDir") String sortDir // 정렬 방향

    );

    // 상품 전체 개수 조회 (페이징용)
    int countProducts(@Param("keyword") String keyword);

    // 재고 증가
    int increaseStock(@Param("id") Long id,
                       @Param("quantity") Integer quantity);

    // 재고 감소
    int decreaseStock(@Param("id") Long id,
                       @Param("quantity") Integer quantity);

}

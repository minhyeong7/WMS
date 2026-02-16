package com.wms.backend.service;

import com.wms.backend.dto.request.ProductRequestDto;
import com.wms.backend.dto.response.ProductResponseDto;

import java.util.List;

public interface ProductService {

    // 상품 등록
    ProductResponseDto create(ProductRequestDto req);

    // 상품 전체 조회
    List<ProductResponseDto> findAll();

    // 상품 단일 조회
    ProductResponseDto findById(Long id);

    // 상품 수정
    ProductResponseDto update(Long id, ProductRequestDto req);

    // 상품 삭제
    void delete(Long id);


}

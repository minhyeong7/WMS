package com.wms.backend.service;

import com.wms.backend.dto.request.ProductRequestDto;
import com.wms.backend.dto.response.ProductResponseDto;

import java.util.List;
import java.util.Map;

public interface ProductService {

    // 물류 등록
    ProductResponseDto create(ProductRequestDto req);

    // 물류 전체 조회
    List<ProductResponseDto> findAll();

    // 물류 단일 조회
    ProductResponseDto findById(Long id);

    // 전체 조회 + 검색 + 정렬 + 페이징
    Map<String, Object> findProducts(String keyword, int page, int size,
                                    String sortColumn, String sortDir);

    // 물류 수정
    ProductResponseDto update(Long id, ProductRequestDto req);

    // 물류 삭제
    void delete(Long id);


}

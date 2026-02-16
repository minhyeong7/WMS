package com.wms.backend.controller;


import com.wms.backend.dto.request.ProductRequestDto;
import com.wms.backend.dto.response.ProductResponseDto;
import com.wms.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    // 상품 등록
    @PostMapping
    public ResponseEntity<ProductResponseDto> create(@RequestBody ProductRequestDto req){
        ProductResponseDto response = productService.create(req);

        return ResponseEntity.ok(response);
    }

    // 상품 전체 조회
    @GetMapping
    public  ResponseEntity<List<ProductResponseDto>> findAll(){
        List<ProductResponseDto> response = productService.findAll();

        return ResponseEntity.ok(response);
    }

    // 상품 단일 조회
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> findById(@PathVariable Long id){
        ProductResponseDto response = productService.findById(id);

        return ResponseEntity.ok(response);
    }

    // 상품 수정
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> update(@PathVariable Long id, @RequestBody ProductRequestDto req){
        ProductResponseDto response = productService.update(id,req);

        return ResponseEntity.ok(response);
    }

    // 상품 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        productService.delete(id);

        return ResponseEntity.ok(
                Map.of("message", "상품이 정상적으로 삭제되었습니다.")
        );
    }



}

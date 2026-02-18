package com.wms.backend.service;

import com.wms.backend.dto.request.ProductRequestDto;
import com.wms.backend.dto.response.ProductResponseDto;
import com.wms.backend.entity.Product;
import com.wms.backend.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;

    // 상품 등록
    @Override
    @Transactional
    public ProductResponseDto create(ProductRequestDto req){

        // sku로 중복체크
        Product existing = productMapper.findBySku(req.getSku());
        if (existing != null) {
            throw new RuntimeException("이미 존재하는 SKU 입니다.");
        }

        // 엔티티 생성
        Product product = Product.builder()
                .sku(req.getSku())
                .name(req.getName())
                .price(req.getPrice())
                .currentStock(req.getCurrentStock())
                .build();

        // 생성된 엔티티 DB저장
        productMapper.insert(product);

        Product saved = productMapper.findById(product.getId());




        return toresponseDto(saved);
    }

    // 상품 전체 조회
    @Override
    public List<ProductResponseDto> findAll(){
        List<Product> products = productMapper.findAll();

        return products.stream()
                .map(this::toresponseDto)
                .toList();
    }

    // 상품 단일 조회
    @Override
    public ProductResponseDto findById(Long id){
        Product product = productMapper.findById(id);

        if(product == null){
            throw new RuntimeException("조회 할 상품이 존재하지 않습니다 id=" + id);
        }

        return toresponseDto(product);
    }

     // 전체 조회 + 검색 + 정렬 + 페이징
    @Override
    public Map<String, Object> findProducts(String keyword, int page, int size,
                                     String sortColumn, String sortDir){
        int offset = page * size;


        List<Product> products = productMapper.findProducts(keyword, offset, size, sortColumn, sortDir);

        int totalCount = productMapper.countProducts(keyword); // keyword에 의한 전체 데이터 개수

        Map<String, Object> result = new HashMap<>();

        result.put("data", products);
        result.put("totalCount", totalCount);
        result.put("page", page);
        result.put("size", size);

        return result;
    }

    // 상품 수정
    @Override
    @Transactional
    public ProductResponseDto update(Long id, ProductRequestDto req) {
        //  기존 상품 조회
        Product product = productMapper.findById(id);
        if (product == null) {
            throw new RuntimeException("수정할 상품이 존재하지 않습니다 id=" + id);
        }

        //  SKU 중복 체크
        Product existing = productMapper.findBySku(req.getSku());
        if (existing != null && !existing.getId().equals(id)) {
            throw new RuntimeException("이미 존재하는 SKU 입니다.");
        }

        //  상품 정보 수정
        product = Product.builder()
                .id(id)  // 기존 id 반드시 포함
                .sku(req.getSku())
                .name(req.getName())
                .price(req.getPrice())
                .currentStock(req.getCurrentStock())
                .build();

        productMapper.update(product);

        //  DTO 반환
        return toresponseDto(product);
    }



    // 상품 삭제
    @Override
    @Transactional
    public void delete(Long id){
        Product product = productMapper.findById(id);

        if(product == null){
            throw new RuntimeException("삭제 할 상품이 존재하지 않습니다 id=" + id);
        }

        productMapper.delete(id);

        log.info("상품 삭제 완료: id={}", id);

    }



    // 공통 응답 객체로 변환 메서드
    private ProductResponseDto toresponseDto(Product product){
        return ProductResponseDto.builder()
                .id(product.getId())
                .sku(product.getSku())
                .price(product.getPrice())
                .name(product.getName())
                .currentStock(product.getCurrentStock())
                .createdAt((product.getCreatedAt()))
                .build();
    }


}

package com.wms.backend.service;

import com.wms.backend.dto.request.StockHistoryRequestDto;

import com.wms.backend.entity.StockHistory;
import com.wms.backend.mapper.ProductMapper;
import com.wms.backend.mapper.StockHistoryMapper;
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
public class StockHistoryServiceImpl implements StockHistoryService {
    private final StockHistoryMapper stockHistoryMapper;
    private final ProductMapper productMapper;

    // 반입
    @Override
    @Transactional
    public void stockIn(Long productId, StockHistoryRequestDto req){

        // 재고 값 예외
        if (req.getMovementQuantity() == null || req.getMovementQuantity() <= 0) {
            log.error("반입 요청값:{}",req.getMovementQuantity());
            throw new IllegalArgumentException("수량은 0보다 커야 합니다.");
        }

        int result = productMapper.increaseStock(productId, req.getMovementQuantity());

        if(result == 0){
            throw new IllegalArgumentException("존재하지 않는 상품입니다.");
        }

        // 이력 객체 생성
        StockHistory history = StockHistory.builder()
                .productId(productId)
                .movementType("IN")
                .movementQuantity(req.getMovementQuantity())
                .build();

        // 이력 저장
        stockHistoryMapper.insert(history);
    }

    // 반출
    @Override
    @Transactional
    public void stockOut(Long productId,StockHistoryRequestDto req){

        // 재고 값 예외
        if (req.getMovementQuantity() == null || req.getMovementQuantity() <= 0) {
            log.error("반출 요청값:{}",req.getMovementQuantity());
            throw new IllegalArgumentException("수량은 0보다 커야 합니다.");
        }

        int result = productMapper.decreaseStock(productId, req.getMovementQuantity());

        if(result == 0){
            throw new IllegalArgumentException("존재하지 않는 상품이거나 현재 재고수량보다 많습니다");
        }

        // 이력 객체 생성
        StockHistory history = StockHistory.builder()
                .productId(productId)
                .movementType("OUT")
                .movementQuantity(req.getMovementQuantity())
                .build();

        // 이력 저장
        stockHistoryMapper.insert(history);



    }

    // 반입 반출 이력 조회
    @Override
    public Map<String,Object> select(String filter, String sortColumn, String sortDir, int page, int size ){

        int offset = page * size; // offset db 행에서 몇 번째 행부터 가져올지 ex ) page 1 size 10 이면 11번째 행부터 가져온다

        if (filter != null && !filter.isEmpty() && !filter.equals("OUT") && !filter.equals("IN")) {
            throw new RuntimeException("필터링 값은 'OUT' 또는 'IN'만 가능합니다.");
        }

        List<StockHistory> list = stockHistoryMapper.select(filter, sortColumn, sortDir , offset ,size);

        int totalCount = stockHistoryMapper.countHistory(filter);

        Map<String,Object> result = new HashMap<>();
        result.put("data",list);
        result.put("totalCount",totalCount);
        result.put("page", page);
        result.put("size", size);



        return result;
    }

}

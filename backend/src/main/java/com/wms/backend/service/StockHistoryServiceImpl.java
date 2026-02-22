package com.wms.backend.service;

import com.wms.backend.dto.request.StockHistoryRequestDto;

import com.wms.backend.entity.StockHistory;
import com.wms.backend.mapper.ProductMapper;
import com.wms.backend.mapper.StockHistoryMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



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
}

package com.wms.backend.service;

import com.wms.backend.dto.request.StockHistoryRequestDto;
import com.wms.backend.entity.StockHistory;
import com.wms.backend.mapper.StockHistoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class StockHistoryServiceImpl {
    private final StockHistoryMapper stockHistoryMapper;


    @Override
    @Transactional
    // 반입, 반출 이력 인서트
    Map<String,Object> moveStock(Long productId,StockHistoryRequestDto req){

    }
}

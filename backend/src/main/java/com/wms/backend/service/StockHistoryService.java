package com.wms.backend.service;

import com.wms.backend.dto.request.StockHistoryRequestDto;
import com.wms.backend.dto.response.DashboardResponseDto;

import java.util.Map;

public interface StockHistoryService {

    // 반입
    void stockIn(Long productId, StockHistoryRequestDto req);

    // 반출
    void stockOut(Long productId, StockHistoryRequestDto req);

    // 반입 /반출 이력 조회
    Map<String,Object> select(String filter,String sortColumn, String sortDir, int page, int size );

    // 대시보드
    DashboardResponseDto getDashboardSummary();
}

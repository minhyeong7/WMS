package com.wms.backend.service;

import com.wms.backend.dto.request.StockHistoryRequestDto;
import java.util.Map;

public interface StockHistoryService {

    Map<String,Object> moveStock(Long productId, StockHistoryRequestDto req);
}

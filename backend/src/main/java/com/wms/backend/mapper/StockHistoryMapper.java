package com.wms.backend.mapper;

import com.wms.backend.entity.StockHistory;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StockHistoryMapper {

    // 반출,반입 이력
    void insert(StockHistory stockHistory);
}

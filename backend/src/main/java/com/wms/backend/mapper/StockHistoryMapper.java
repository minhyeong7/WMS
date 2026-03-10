package com.wms.backend.mapper;

import com.wms.backend.entity.StockHistory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface StockHistoryMapper {

    // 반출,반입 이력
    void insert(StockHistory stockHistory);

    // 이력 조회
    List<StockHistory> select(
            @Param("filter") String filter, // 반입 or 반출 필터링
            @Param("sortColumn") String sortColumn, // 정렬 기준
            @Param("sortDir") String sortDir, // 정렬 방향
            @Param("offset")  int offset ,// 페이징 시작 위치
            @Param("size")    int size // 데이터 개수
    );

    // 이력 조회 개수
    int countHistory(
            @Param("filter") String filter
    );

    // 오늘 반입 개수
    int todayInCount();

    // 오늘 반출 개수
    int todayOutCount();

}

package com.wms.backend.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;





@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DashboardResponseDto {
    private Integer todayInCount; // 오늘 반입 개수
    private Integer todayOutCount; // 오늘 반출 개수
    private Integer nowStockCount; // 현재 총 물류량
    private Integer totalProductCount; // 등록된 상품 수량
}

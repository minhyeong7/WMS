package com.wms.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockHistoryRequestDto {
//    private Long productId; 해당 id는 파라미터로 받아오기 때문에 주석
    private String movementType;
    private Integer movementQuantity;
}

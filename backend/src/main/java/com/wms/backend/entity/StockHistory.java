package com.wms.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockHistory {
    private Long id;
    private Long productId;
    private String movementType;
    private Integer movementQuantity;
    private LocalDateTime createdAt;
}

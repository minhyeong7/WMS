package com.wms.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDto {
    private Long id;
    private String sku;
    private String name;
    private Integer price;
    private Integer currentStock; // 현재 총 재고 수량
    private LocalDateTime createdAt;
}

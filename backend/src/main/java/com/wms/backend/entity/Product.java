package com.wms.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Product {
    private Long id;
    private String sku;
    private String name;
    private Integer price;
    private Integer currentStock; // 현재 총 재고 수량
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

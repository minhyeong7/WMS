package com.wms.backend.controller;

import com.wms.backend.dto.request.ProductRequestDto;
import com.wms.backend.dto.request.StockHistoryRequestDto;
import com.wms.backend.dto.response.ProductResponseDto;
import com.wms.backend.service.StockHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class StockHistoryController {

    private final StockHistoryService stockHistoryService;

    // 반입
    @PostMapping("/{productId}/in")
    public ResponseEntity<String> stockIn(@PathVariable Long productId, @RequestBody StockHistoryRequestDto req){
        stockHistoryService.stockIn(productId,req);

        return ResponseEntity.ok("입고완료");

    }

    // 반출
    @PostMapping("/{productId}/out")
    public ResponseEntity<String> stockOut(@PathVariable Long productId, @RequestBody StockHistoryRequestDto req){
        stockHistoryService.stockOut(productId,req);

        return ResponseEntity.ok("출고완료");

    }

    // 이력 조회
    @GetMapping("/history")
    public ResponseEntity<Map<String,Object>> select(
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String sortColumn,
            @RequestParam(required = false) String sortDir,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){

        Map<String,Object> response = stockHistoryService.select(filter,sortColumn,sortDir,page,size);

        return ResponseEntity.ok(response);
    }

}

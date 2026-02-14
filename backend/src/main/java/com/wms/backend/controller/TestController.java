package com.wms.backend.controller;

import com.wms.backend.mapper.TestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final TestMapper testMapper;

    @GetMapping("/db-test")
    public String test() {
        int result = testMapper.testConnection();
        return "DB 연결 성공: " + result;
    }
}


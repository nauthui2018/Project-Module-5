package com.shopnow.controller.api.user;

import com.shopnow.model.StockCheck;
import com.shopnow.service.StockCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/stock_check")
public class APIStockCheck {

    @Autowired
    StockCheckService stockCheckService;

    @GetMapping
    public ResponseEntity<List<StockCheck>> listStockCheck() {
        List<StockCheck> stock_checks = stockCheckService.findAll();
        return new ResponseEntity<>(stock_checks, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<StockCheck> saveStockCheck(@RequestBody StockCheck stock_check) {
        stockCheckService.save(stock_check);
        return new ResponseEntity<>(stock_check, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<StockCheck> getStockCheck(@PathVariable("id") Long id) {
        StockCheck stock_check = stockCheckService.findById(id);
        if (stock_check != null) {
            return new ResponseEntity<>(stock_check, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(stock_check, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping
    public ResponseEntity<StockCheck> updateStockCheck(@RequestBody StockCheck stock_check) {
        stockCheckService.save(stock_check);
        return new ResponseEntity<>(stock_check, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteStockCheck(@PathVariable("id") Long id) {
        return new ResponseEntity<>(stockCheckService.deleteById(id), HttpStatus.OK);
    }
}

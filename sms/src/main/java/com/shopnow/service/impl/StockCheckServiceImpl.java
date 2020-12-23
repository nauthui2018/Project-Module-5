package com.shopnow.service.impl;

import com.shopnow.model.ProductType;
import com.shopnow.model.StockCheck;
import com.shopnow.repository.StockCheckRepository;
import com.shopnow.service.StockCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class StockCheckServiceImpl implements StockCheckService {
    @Autowired
    StockCheckRepository stockCheckRepository;

    @Override
    public List<StockCheck> findAll() {
        return stockCheckRepository.findAll();
    }

    @Override
    public StockCheck save(StockCheck object) {
        ZonedDateTime today = ZonedDateTime.now();
        if(object.getId() == null) {
            object.setCreating_date(today);
        } else {
            StockCheck stock_check = findById(object.getId());
            ZonedDateTime creating_date = stock_check.getCreating_date();
            object.setCreating_date(creating_date);
        }
        return stockCheckRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        StockCheck stock_check = findById(id);
        if(stock_check != null){
            stock_check.setDeleted(true);
            stockCheckRepository.save(stock_check);
            return true;
        }
        return false;
    }

    @Override
    public StockCheck findById(Long id) {
        return stockCheckRepository.findById(id).orElse(null);
    }
}

package com.shopnow.repository;

import com.shopnow.model.StockCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface StockCheckRepository extends JpaRepository<StockCheck, Long> {
}

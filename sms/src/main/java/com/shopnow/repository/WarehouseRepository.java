package com.shopnow.repository;

import com.shopnow.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
}

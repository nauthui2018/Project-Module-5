package com.shopnow.repository;

import com.shopnow.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}

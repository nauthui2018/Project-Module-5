package com.shopnow.repository;

import com.shopnow.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
}

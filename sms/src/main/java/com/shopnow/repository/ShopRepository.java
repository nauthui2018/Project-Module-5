package com.shopnow.repository;

import com.shopnow.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ShopRepository extends JpaRepository<Shop, Long> {
    Shop findByEmail(String email);
}

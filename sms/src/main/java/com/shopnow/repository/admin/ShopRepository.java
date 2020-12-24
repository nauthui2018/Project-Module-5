package com.shopnow.repository.admin;

import com.shopnow.model.admin.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ShopRepository extends JpaRepository<Shop, Long> {
}

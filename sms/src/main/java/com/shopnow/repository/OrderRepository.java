package com.shopnow.repository;

import com.shopnow.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface OrderRepository extends JpaRepository<Order,Long> {
    Order findTopByOrderByIdDesc();
}

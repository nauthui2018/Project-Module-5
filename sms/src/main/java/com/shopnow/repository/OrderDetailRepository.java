package com.shopnow.repository;

import com.shopnow.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
}

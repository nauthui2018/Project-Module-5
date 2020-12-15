package com.shopnow.repository;

import com.shopnow.model.CustomerGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface CustomerGroupRepository extends JpaRepository<CustomerGroup, Long> {
}

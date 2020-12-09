package com.shopnow.repository;

import com.shopnow.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface CustomerRepository extends JpaRepository<Customer,Long> {
}

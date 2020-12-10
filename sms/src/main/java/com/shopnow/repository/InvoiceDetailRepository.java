package com.shopnow.repository;

import com.shopnow.model.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Long> {
}

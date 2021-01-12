package com.shopnow.repository;

import com.shopnow.model.Invoice;
import com.shopnow.model.InvoiceDetail;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Long> {
    List<InvoiceDetail> findAllByInvoice(Invoice invoice);
    List<InvoiceDetail> findAllByInvoiceId(long invoice_id);
}

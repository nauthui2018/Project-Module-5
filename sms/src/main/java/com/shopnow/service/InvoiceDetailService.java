package com.shopnow.service;

import com.shopnow.model.Invoice;
import com.shopnow.model.InvoiceDetail;

import java.util.List;

public interface InvoiceDetailService extends BaseService<InvoiceDetail> {
    List<InvoiceDetail> findAllByInvoice(Invoice invoice);
}

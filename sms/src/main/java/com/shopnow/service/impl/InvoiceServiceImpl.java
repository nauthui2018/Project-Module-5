package com.shopnow.service.impl;

import com.shopnow.model.Invoice;
import com.shopnow.repository.InvoiceRepository;
import com.shopnow.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {
    @Autowired
    InvoiceRepository invoiceRepository;

    @Override
    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    @Override
    public Invoice save(Invoice object) {
        return invoiceRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        Invoice invoice = findById(id);
        if (invoice != null) {
           invoiceRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean removeById(Long id){
        Invoice invoice = findById(id);
        if (invoice != null) {
            invoice.setDeleted(true);
            invoiceRepository.save(invoice);
            return true;
        }
        return false;
    }

    @Override
    public Invoice findById(Long id) {
        return invoiceRepository.findById(id).orElse(null);
    }
}

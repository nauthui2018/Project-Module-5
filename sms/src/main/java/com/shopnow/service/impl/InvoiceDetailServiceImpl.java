package com.shopnow.service.impl;

import com.shopnow.model.Invoice;
import com.shopnow.model.InvoiceDetail;
import com.shopnow.repository.InvoiceDetailRepository;
import com.shopnow.service.InvoiceDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceDetailServiceImpl implements InvoiceDetailService {
    @Autowired
    InvoiceDetailRepository invoiceDetailRepository;

    @Override
    public List<InvoiceDetail> findAll() {
        return invoiceDetailRepository.findAll();
    }

    @Override
    public InvoiceDetail save(InvoiceDetail object) {
        return invoiceDetailRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        InvoiceDetail invoiceDetail=findById(id);
        if(invoiceDetail!=null){
            invoiceDetailRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean removeById(Long id){
        InvoiceDetail invoiceDetail=findById(id);
        if(invoiceDetail!=null){
            invoiceDetail.setDeleted(true);
            invoiceDetailRepository.save(invoiceDetail);
            return true;
        }
        return false;
    }

    @Override
    public InvoiceDetail findById(Long id) {
        return invoiceDetailRepository.findById(id).orElse(null);
    }

    @Override
    public List<InvoiceDetail> findAllByInvoice(Invoice invoice){
        return invoiceDetailRepository.findAllByInvoice(invoice);
    }
}

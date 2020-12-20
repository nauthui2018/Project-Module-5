package com.shopnow.service.impl;

import com.shopnow.model.Supplier;
import com.shopnow.repository.SupplierRepository;
import com.shopnow.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    SupplierRepository supplierRepository;

    @Override
    public List<Supplier> findAll() {
        return supplierRepository.findAll();
    }

    @Override
    public Supplier save(Supplier object) {
        return supplierRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        Supplier supplier = findById(id);
        if(supplier != null){
            supplier.setDeleted(true);
            supplierRepository.save(supplier);
            return true;
        }
        return false;
    }

    @Override
    public Supplier findById(Long id) {
        return supplierRepository.findById(id).orElse(null);
    }
}

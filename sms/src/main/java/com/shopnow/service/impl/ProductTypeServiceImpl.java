package com.shopnow.service.impl;

import com.shopnow.model.ProductType;
import com.shopnow.repository.ProductTypeRepository;
import com.shopnow.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {
    @Autowired
    ProductTypeRepository productTypeRepository;

    @Override
    public List<ProductType> findAll() {
        return productTypeRepository.findAll();
    }

    @Override
    public ProductType save(ProductType object) {
        return productTypeRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        ProductType productType = findById(id);
        if(productType != null){
            productType.setDeleted(true);
            productTypeRepository.save(productType);
            return true;
        }
        return false;
    }

    @Override
    public ProductType findById(Long id) {
        return productTypeRepository.findById(id).orElse(null);
    }
}

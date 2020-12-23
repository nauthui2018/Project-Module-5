package com.shopnow.service.impl;

import com.shopnow.model.CustomerGroup;
import com.shopnow.model.ProductType;
import com.shopnow.repository.ProductTypeRepository;
import com.shopnow.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
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
        ZonedDateTime today = ZonedDateTime.now();
        if(object.getId() == null) {
            object.setCreating_date(today);
        } else {
            ProductType product_type = findById(object.getId());
            ZonedDateTime creating_date = product_type.getCreating_date();
            object.setCreating_date(creating_date);
        }
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

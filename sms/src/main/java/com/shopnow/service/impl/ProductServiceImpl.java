package com.shopnow.service.impl;

import com.shopnow.model.Product;
import com.shopnow.repository.ProductRepository;
import com.shopnow.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product save(Product object) {
        ZonedDateTime today = ZonedDateTime.now();
        if(object.getId() == null) {
            object.setCreating_date(today);
        } else {
            Product product = findById(object.getId());
            ZonedDateTime creating_date = product.getCreating_date();
            object.setCreating_date(creating_date);
        }
        return productRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        Product product=findById(id);
        if(product!=null){
            product.setDeleted(true);
            productRepository.save(product);
            return true;
        }
        return false;
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}

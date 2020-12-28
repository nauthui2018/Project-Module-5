package com.shopnow.controller.api.user;

import com.shopnow.model.Product;
import com.shopnow.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/product")
public class APIProduct {
    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> listProduct() {
        List<Product> products = productService.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") Long id){
        Product product= productService.findById(id);
        if(product!=null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(product, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody Product product){
        productService.save(product);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteProduct(@PathVariable("id") Long id){
        return new ResponseEntity<>(productService.deleteById(id), HttpStatus.OK);
    }
}
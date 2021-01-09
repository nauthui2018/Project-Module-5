package com.shopnow.controller.api.user;

import com.shopnow.model.ProductType;
import com.shopnow.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/product_type")
public class APIProductType {
    @Autowired
    ProductTypeService productTypeService;

    @GetMapping
    public ResponseEntity<List<ProductType>> listProductType() {
        List<ProductType> productTypes = productTypeService.findAll();
        return new ResponseEntity<>(productTypes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProductType> saveProductType(@RequestBody ProductType productType) {
        productTypeService.save(productType);
        return new ResponseEntity<>(productType, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProductType> getProductType(@PathVariable("id") Long id){
        ProductType productType= productTypeService.findById(id);
        if(productType != null) {
            return new ResponseEntity<>(productType, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(productType, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping
    public ResponseEntity<ProductType> updateProductType(@RequestBody ProductType productType){
        productTypeService.save(productType);
        return new ResponseEntity<>(productType, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteProductType(@PathVariable("id") Long id){
        return new ResponseEntity<>(productTypeService.deleteById(id), HttpStatus.OK);
    }
}

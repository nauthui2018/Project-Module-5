package com.shopnow.controller.api.user;

import com.shopnow.model.Supplier;
import com.shopnow.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/supplier")
public class APISupplier {
    @Autowired
    SupplierService supplierService;

    @GetMapping
    public ResponseEntity<List<Supplier>> listSupplier() {
        List<Supplier> suppliers = supplierService.findAll();
        return new ResponseEntity<>(suppliers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Supplier> saveSupplier(@RequestBody Supplier supplier) {
        supplierService.save(supplier);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Supplier> getSupplier(@PathVariable("id") Long id) {
        Supplier supplier = supplierService.findById(id);
        if (supplier != null) {
            return new ResponseEntity<>(supplier, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(supplier, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping
    public ResponseEntity<Supplier> updateSupplier(@RequestBody Supplier supplier) {
        supplierService.save(supplier);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteSupplier(@PathVariable("id") Long id) {
        return new ResponseEntity<>(supplierService.deleteById(id), HttpStatus.OK);
    }
}

package com.shopnow.controller.api.user;

import com.shopnow.model.Warehouse;
import com.shopnow.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/warehouse")
public class APIWarehouse {
    @Autowired
    WarehouseService warehouseService;

    @GetMapping
    public ResponseEntity<List<Warehouse>> listWarehouse() {
        List<Warehouse> warehouses = warehouseService.findAll();
        return new ResponseEntity<>(warehouses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Warehouse> saveWarehouse(@RequestBody Warehouse warehouse) {
        warehouseService.save(warehouse);
        return new ResponseEntity<>(warehouse, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Warehouse> getWarehouse(@PathVariable("id") Long id){
        Warehouse warehouse = warehouseService.findById(id);
        if(warehouse != null) {
            return new ResponseEntity<>(warehouse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(warehouse, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouse){
        warehouseService.save(warehouse);
        return new ResponseEntity<>(warehouse, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteWarehouse(@PathVariable("id") Long id){
        return new ResponseEntity<>(warehouseService.deleteById(id), HttpStatus.OK);
    }
}

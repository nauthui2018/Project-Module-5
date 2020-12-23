package com.shopnow.service.impl;

import com.shopnow.model.CustomerGroup;
import com.shopnow.model.Warehouse;
import com.shopnow.repository.WarehouseRepository;
import com.shopnow.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {
    @Autowired
    WarehouseRepository warehouseRepository;

    @Override
    public List<Warehouse> findAll() {
        return warehouseRepository.findAll();
    }

    @Override
    public Warehouse save(Warehouse object) {
        ZonedDateTime today = ZonedDateTime.now();
        if(object.getId() == null) {
            object.setCreating_date(today);
        } else {
            Warehouse warehouse = findById(object.getId());
            ZonedDateTime creating_date = warehouse.getCreating_date();
            object.setCreating_date(creating_date);
        }
        return warehouseRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        Warehouse warehouse = findById(id);
        if(warehouse != null){
            warehouse.setDeleted(true);
            warehouseRepository.save(warehouse);
            return true;
        }
        return false;
    }

    @Override
    public Warehouse findById(Long id) {
        return warehouseRepository.findById(id).orElse(null);
    }
}

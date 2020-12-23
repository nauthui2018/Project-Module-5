package com.shopnow.service.impl;

import com.shopnow.model.CustomerGroup;
import com.shopnow.repository.CustomerGroupRepository;
import com.shopnow.service.CustomerGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class CustomerGroupServiceImpl implements CustomerGroupService {
    @Autowired
    CustomerGroupRepository customerGroupRepository;

    @Override
    public List<CustomerGroup> findAll() {
        return customerGroupRepository.findAll();
    }

    @Override
    public CustomerGroup save(CustomerGroup object) {
        ZonedDateTime today = ZonedDateTime.now();
        if(object.getId() == null) {
            object.setCreating_date(today);
        } else {
            CustomerGroup oldGroup = findById(object.getId());
            ZonedDateTime creating_date = oldGroup.getCreating_date();
            object.setCreating_date(creating_date);
        }
        return customerGroupRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        CustomerGroup customerGroup = findById(id);
        if(customerGroup != null){
            customerGroup.setDeleted(true);
            customerGroupRepository.save(customerGroup);
            return true;
        }
        return false;
    }

    @Override
    public CustomerGroup findById(Long id) {
        return customerGroupRepository.findById(id).orElse(null);
    }
}

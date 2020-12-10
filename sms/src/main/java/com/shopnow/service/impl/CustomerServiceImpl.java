package com.shopnow.service.impl;

import com.shopnow.model.Customer;
import com.shopnow.repository.CustomerRepository;
import com.shopnow.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepository customerRepository;
    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer save(Customer object) {
        return customerRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        Customer customer=findById(id);
        if(customer!=null){
            customer.setDeleted(true);
            customerRepository.save(customer);
            return true;
        }
        return false;
    }

    @Override
    public Customer findById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }
}

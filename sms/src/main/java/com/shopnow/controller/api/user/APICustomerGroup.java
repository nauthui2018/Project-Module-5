package com.shopnow.controller.api.user;

import com.shopnow.model.CustomerGroup;
import com.shopnow.service.CustomerGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/customer_group")
public class APICustomerGroup {
    @Autowired
    CustomerGroupService customerGroupService;

    @GetMapping
    public ResponseEntity<List<CustomerGroup>> listCustomerGroup() {
        List<CustomerGroup> customerGroups = customerGroupService.findAll();
        return new ResponseEntity<>(customerGroups, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CustomerGroup> saveCustomerGroup(@RequestBody CustomerGroup customerGroup) {
        customerGroupService.save(customerGroup);
        return new ResponseEntity<>(customerGroup, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CustomerGroup> getCustomerGroup(@PathVariable("id") Long id){
        CustomerGroup customerGroup= customerGroupService.findById(id);
        if(customerGroup != null) {
            return new ResponseEntity<>(customerGroup, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(customerGroup, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping
    public ResponseEntity<CustomerGroup> updateCustomerGroup(@RequestBody CustomerGroup customerGroup){
        customerGroupService.save(customerGroup);
        return new ResponseEntity<>(customerGroup, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteCustomerGroup(@PathVariable("id") Long id){
        return new ResponseEntity<>(customerGroupService.deleteById(id), HttpStatus.OK);
    }
}

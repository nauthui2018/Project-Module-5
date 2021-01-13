package com.shopnow.controller.api.user;

import com.shopnow.model.Order;
import com.shopnow.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/order")
public class APIOrder {
    @Autowired
    OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> listOrder() {
        List<Order> orders = orderService.findAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping(value = "/newOrder")
    public ResponseEntity<Order> getNewOrderId() {
        Order order = orderService.findTopByOrderByIdDesc();
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Order> saveOrder(@RequestBody Order order) {
        orderService.save(order);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable("id") Long id){
        Order order = orderService.findById(id);
        if(order != null) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(order, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping
    public ResponseEntity<Order> updateOrder(@RequestBody Order order){
        orderService.save(order);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteOrder(@PathVariable("id") Long id){
        return new ResponseEntity<>(orderService.deleteById(id), HttpStatus.OK);
    }
}

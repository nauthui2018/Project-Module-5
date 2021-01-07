package com.shopnow.controller.api.user;

import com.shopnow.model.OrderDetail;
import com.shopnow.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/order_detail")
public class APIOrderDetail {
    @Autowired
    OrderDetailService orderDetailService;

    @GetMapping
    public ResponseEntity<List<OrderDetail>> listOrderDetail() {
        List<OrderDetail> order_details = orderDetailService.findAll();
        return new ResponseEntity<>(order_details, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrderDetail> saveOrderDetail(@RequestBody OrderDetail orderDetail) {
        orderDetailService.save(orderDetail);
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<OrderDetail> getOrderDetail(@PathVariable("id") Long id){
        OrderDetail orderDetail = orderDetailService.findById(id);
        if(orderDetail != null) {
            return new ResponseEntity<>(orderDetail, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(orderDetail, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping
    public ResponseEntity<OrderDetail> updateOrderDetail(@RequestBody OrderDetail orderDetail){
        orderDetailService.save(orderDetail);
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteOrderDetail(@PathVariable("id") Long id){
        return new ResponseEntity<>(orderDetailService.deleteById(id), HttpStatus.OK);
    }
}

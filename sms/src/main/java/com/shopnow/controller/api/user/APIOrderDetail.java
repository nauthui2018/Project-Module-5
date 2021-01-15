package com.shopnow.controller.api.user;

import com.shopnow.model.Order;
import com.shopnow.model.OrderDetail;
import com.shopnow.model.Product;
import com.shopnow.model.Warehouse;
import com.shopnow.service.OrderDetailService;
import com.shopnow.service.OrderService;
import com.shopnow.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user/order_detail")
public class APIOrderDetail {
    @Autowired
    OrderDetailService orderDetailService;

    @Autowired
    ProductService productService;

    @Autowired
    OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderDetail>> listOrderDetail() {
        List<OrderDetail> orderDetails = orderDetailService.findAll();
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
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
        Warehouse warehouse = orderDetail.getWarehouse();
        Product newProduct = orderDetail.getProduct();
        Long product_id = newProduct.getId();
        Order order = orderDetail.getOrder();
        boolean newStatus = order.isFinished();
        Long order_id = order.getId();
        Product currentProduct = productService.findById(product_id);
        Order currentOrder = orderService.findById(order_id);
        int currentStock = currentProduct.getStock();
        int orderQuantity = orderDetail.getOrder_quantity();
        if (warehouse.getId() == 1) {
            int newStock = currentStock + orderQuantity;
            currentProduct.setStock(newStock);
            orderDetail.setStock(orderQuantity);
            if (newStatus) {
                currentOrder.setFinished(true);
            }
        }
        orderDetailService.save(orderDetail);
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteOrderDetail(@PathVariable("id") Long id){
        return new ResponseEntity<>(orderDetailService.deleteById(id), HttpStatus.OK);
    }
}

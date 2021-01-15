package com.shopnow.service.impl;

import com.shopnow.model.Order;
import com.shopnow.model.OrderDetail;
import com.shopnow.model.Product;
import com.shopnow.repository.OrderDetailRepository;
import com.shopnow.repository.ProductRepository;
import com.shopnow.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetail> findAll() {
        return orderDetailRepository.findAll();
    }

    @Override
    public OrderDetail save(OrderDetail object) {
        ZonedDateTime today = ZonedDateTime.now();
        if(object.getWarehouse() != null) {
            object.setFinished_date(today);
            object.setFinished(true);
        }
        return orderDetailRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        OrderDetail orderDetail = findById(id);
        if(orderDetail != null){
            orderDetail.setDeleted(true);
            orderDetailRepository.save(orderDetail);
            return true;
        }
        return false;
    }

    @Override
    public OrderDetail findById(Long id) {
        return orderDetailRepository.findById(id).orElse(null);
    }
}

package com.shopnow.service.impl;

import com.shopnow.model.OrderDetail;
import com.shopnow.repository.OrderDetailRepository;
import com.shopnow.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

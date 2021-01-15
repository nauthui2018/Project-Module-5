package com.shopnow.service.impl;

import com.shopnow.model.Order;
import com.shopnow.repository.OrderRepository;
import com.shopnow.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order save(Order object) {
        ZonedDateTime today = ZonedDateTime.now();
        if(object.getId() == null) {
            object.setOrdered_date(today);
            object.setFinished_date(null);
        } else {
            Order order = findById(object.getId());
            ZonedDateTime ordered_date = order.getOrdered_date();
            object.setOrdered_date(ordered_date);
            if (object.isFinished()) {
                object.setFinished_date(today);
            }
        }
        return orderRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        Order order = findById(id);
        if(order != null){
            order.setDeleted(true);
            orderRepository.save(order);
            return true;
        }
        return false;
    }

    @Override
    public Order findById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public Order findTopByOrderByIdDesc() {
        return orderRepository.findTopByOrderByIdDesc();
    }
}

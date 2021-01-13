package com.shopnow.service;

import com.shopnow.model.Order;

public interface OrderService extends BaseService<Order>{
    Order findTopByOrderByIdDesc();
}

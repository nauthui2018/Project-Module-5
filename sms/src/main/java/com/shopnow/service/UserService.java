package com.shopnow.service;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.service.BaseService;

import java.util.List;

public interface UserService extends BaseService<User> {
    User findByEmail(String username);
    List<User> findAllByShop(Shop shop);
}

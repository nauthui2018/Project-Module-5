package com.shopnow.service;

import com.shopnow.model.User;
import com.shopnow.service.BaseService;

public interface UserService extends BaseService<User> {
    User findByEmail(String username);
}

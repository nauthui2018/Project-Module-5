package com.shopnow.service;

import com.shopnow.model.User;
import org.springframework.stereotype.Service;

public interface UserService extends BaseService<User>{
    User findByEmail(String username);
}

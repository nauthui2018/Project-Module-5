package com.shopnow.service.InterfaceServiveAdmin;

import com.shopnow.model.admin.User;
import com.shopnow.service.BaseService;

public interface UserService extends BaseService<User> {
    User findByEmail(String username);
}

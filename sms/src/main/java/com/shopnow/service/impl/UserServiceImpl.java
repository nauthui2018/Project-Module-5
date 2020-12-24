package com.shopnow.service.impl;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.repository.ShopRepository;
import com.shopnow.repository.UserRepository;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ShopRepository shopRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User object) {
        return userRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        User user = findById(id);
        if (user != null) {
            if (!user.getRole().equalsIgnoreCase("shop_owner")) {
                user.setDeleted(true);
                userRepository.save(user);
                return true;
            } else if (user.getRole().equalsIgnoreCase("shop_owner")) {
                user.setDeleted(true);
                userRepository.save(user);
                shopRepository.delete(user.getShop());
                return true;
            }
        }  return false;
    }

        @Override
        public User findById (Long id){
            return userRepository.findById(id).orElse(null);
        }

        @Override
        public User findByEmail (String email){
            User user = userRepository.findByEmail(email);
            return user;
        }
    }

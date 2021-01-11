package com.shopnow.service.impl;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.repository.UserRepository;
import com.shopnow.service.ShopService;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ShopService shopService;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User object) {
        if(object.getRole().equalsIgnoreCase("ADMIN")){
            object.setShop(null);
        }
        return userRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        User user = findById(id);
        if (user != null) {
            if (user.getRole().equalsIgnoreCase("ADMIN")) {
                user.setEnable(false);
                userRepository.save(user);
                return true;
            }

            Shop shop = user.getShop();
            int countShopOwner=0;
            Set<User> userList = shop.getUsers();


            for(User userItem: userList){
                if(userItem.getRole().equalsIgnoreCase("shop_owner")){
                    countShopOwner++;
                }
            }

            if (!user.getRole().equalsIgnoreCase("shop_owner")) {
                user.setEnable(false);
                userRepository.save(user);
                return true;
            } else if (user.getRole().equalsIgnoreCase("shop_owner")&&countShopOwner==1) {
                shopService.delete(shop);
                return true;
            } else if(user.getRole().equalsIgnoreCase("shop_owner")&&countShopOwner>1){
                user.setEnable(false);
                userRepository.save(user);
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

        @Override
        public List<User> findAllByShop (Shop shop){
            List<User> users = userRepository.findAllByShop(shop);
            return users;
        }
    }

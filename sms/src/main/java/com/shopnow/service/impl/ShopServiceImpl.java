package com.shopnow.service.impl;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.repository.ShopRepository;
import com.shopnow.service.ShopService;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {
    @Autowired
    ShopRepository shopRepository;

    @Autowired
    UserService userService;

    @Override
    public List<Shop> findAll() {
        return shopRepository.findAll();
    }

    @Override
    public Shop save(Shop object) {
        ZonedDateTime today = ZonedDateTime.now();
        if(object.getId()==null) {
            object.setCreated_at(today);
        } else {
            Shop shop=findById(object.getId());
            object.setCreated_at(shop.getCreated_at());
        }
        object.setUpdated_at(today);
        return shopRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        Shop shop=findById(id);
        if(shop!=null){
            List<User> users = userService.findAllByShop(shop);
            for (User user: users) {
                user.setEnable(false);
                userService.save(user);
            }
            shop.setDeleted(true);
            shopRepository.save(shop);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(Shop shop){
        List<User> users = userService.findAllByShop(shop);
        for (User user: users) {
            user.setEnable(false);
            userService.save(user);
        }
        shop.setDeleted(true);
        shopRepository.save(shop);
        return true;
    }

    @Override
    public Shop findById(Long id) {
        return shopRepository.findById(id).orElse(null);
    }

    @Override
    public Shop findByEmail(String email){
        return shopRepository.findByEmail(email);
    }
}

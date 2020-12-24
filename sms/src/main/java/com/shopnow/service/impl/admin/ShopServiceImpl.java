package com.shopnow.service.impl.admin;

import com.shopnow.model.admin.Shop;
import com.shopnow.repository.admin.ShopRepository;
import com.shopnow.service.InterfaceServiveAdmin.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {
    @Autowired
    ShopRepository shopRepository;

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
            shopRepository.delete(shop);
            return true;
        }
        return false;
    }

    public void delete(Shop shop){
        shopRepository.delete(shop);
    }

    @Override
    public Shop findById(Long id) {
        return shopRepository.findById(id).orElse(null);
    }
}

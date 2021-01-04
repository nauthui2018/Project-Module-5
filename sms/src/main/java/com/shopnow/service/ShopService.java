package com.shopnow.service;

import com.shopnow.model.Shop;
import com.shopnow.service.BaseService;

public interface ShopService extends BaseService<Shop> {
    boolean delete(Shop shop);
    Shop findByEmail(String email);
}

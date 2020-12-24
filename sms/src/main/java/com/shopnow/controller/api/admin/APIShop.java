package com.shopnow.controller.api.admin;

import com.shopnow.model.admin.Shop;
import com.shopnow.service.InterfaceServiveAdmin.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "admin/api/shop")
public class APIShop {
    @Autowired
    ShopService shopService;

    @GetMapping
    public ResponseEntity<List<Shop>> listShop() {
        List<Shop> shops = shopService.findAll();
        return new ResponseEntity<>(shops, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Shop> saveShop(@RequestBody Shop shop) {
        shopService.save(shop);
        return new ResponseEntity<>(shop, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Shop> getShop(@PathVariable("id") Long id){
        Shop shop= shopService.findById(id);
        if(shop!=null)
            return new ResponseEntity<>(shop,HttpStatus.OK);
        return new ResponseEntity<>(shop,HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Shop> updateShop(@RequestBody Shop shop){
        shopService.save(shop);
        return new ResponseEntity<>(shop, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteShop(@PathVariable("id") Long id){
        return new ResponseEntity<>(shopService.deleteById(id), HttpStatus.OK);
    }
}

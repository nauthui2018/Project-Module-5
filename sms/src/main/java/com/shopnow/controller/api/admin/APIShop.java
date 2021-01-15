package com.shopnow.controller.api.admin;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.service.ShopService;
import com.shopnow.service.UploadFile.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/shop")
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
        Shop shopCheck = shopService.findByEmail(shop.getEmail());
        if(shopCheck!=null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
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

    @PostMapping(value = "/upload")
    public ResponseEntity<String> uploadLogo1(@RequestParam("file") MultipartFile file, @RequestParam  Long id ) throws IllegalStateException, IOException {
        Shop shop=shopService.findById(id);
        String src="./src/main/resources/static/admin/build/images/imagesShop";
        shop.setLogo("/admin/build/images/imagesShop/"+ FileUploadService.uploadFile(file,src));
        shopService.save(shop);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}

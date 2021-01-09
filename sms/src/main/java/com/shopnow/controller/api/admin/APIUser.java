package com.shopnow.controller.api.admin;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.service.ShopService;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/user")
public class APIUser {
    @Autowired
    UserService userService;
    @Autowired
    ShopService shopService;

    @GetMapping
    public ResponseEntity<List<User>> listUser() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User userCheck = userService.findByEmail(user.getEmail());
        if(userCheck!=null){
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/{email}")
    public ResponseEntity<User> saveUserByShop(@RequestBody User user, @PathVariable("email") String email) {
        Shop shop= shopService.findByEmail(email);
        User userCheck = userService.findByEmail(email);
        if(userCheck!=null){
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setShop(shop);
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id){
        User user= userService.findById(id);
        if(user!=null)
            return new ResponseEntity<>(user,HttpStatus.OK);
        return new ResponseEntity<>(user,HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user){
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") Long id){
        return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
    }
}

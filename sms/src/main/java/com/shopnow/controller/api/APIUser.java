package com.shopnow.controller.api;

import com.shopnow.model.User;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/users")
public class APIUser {
    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> listUser() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
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

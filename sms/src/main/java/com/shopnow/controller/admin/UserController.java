package com.shopnow.controller.admin;

import com.shopnow.model.User;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "admins/registers")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public String index(){
        return "admin/user/user";
    }

    @GetMapping(value = "/user_detail/{id}")
    public ModelAndView getUserById(@PathVariable("id") Long id){
        User user= userService.findById(id);
        return new ModelAndView("admin/user/user_detail", "user", user);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") Long id){
        return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
    }

}

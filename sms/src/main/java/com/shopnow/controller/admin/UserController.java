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

@Controller
@RequestMapping(value = "admin/registers")
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

    @GetMapping(value = "/sign_in")
    public ModelAndView getViewRegister(){
        return new ModelAndView("fe/login/register","user",new User());
    }

    @PostMapping
    public String createUser(@ModelAttribute("user") User user, Model model){
        //Ma hoa password
        User userCheck = userService.findByEmail(user.getEmail());
        if(userCheck!=null){
            model.addAttribute("message", "User name already exists");
            model.addAttribute("user",user);
            return "fe/login/register";
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRole("SHOP_OWNER");
        user.setDeleted(false);
        userService.save(user);
        return "fe/login/index";
    }
}

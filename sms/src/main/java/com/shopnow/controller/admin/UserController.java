package com.shopnow.controller.admin;

import com.shopnow.model.User;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/register")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ModelAndView getViewRegister(){
        return new ModelAndView("register","user",new User());
    }
    @PostMapping
    public String createUser(@ModelAttribute("user") User user, Model model){
        //Ma hoa password
        User userCheck = userService.findByEmail(user.getEmail());
        if(userCheck!=null){
            model.addAttribute("message", "User name already exists");
            model.addAttribute("user",user);
            return "register";
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRole("USER");
        user.setDeleted(false);
        userService.save(user);
        return "redirect:/login";
    }
}

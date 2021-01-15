package com.shopnow.controller.login;

import com.shopnow.model.User;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {
    @Autowired
    private UserService userService;

    @GetMapping("/default")
    public String defaultAfterLogin(HttpServletRequest request) {
        if (request.isUserInRole("ADMIN")) {
            return "redirect:/admins/";
        } else {
            return "redirect:/user/";
        }
    }

    @GetMapping(value = "/login")
    public ModelAndView getViewRegister(){
        return new ModelAndView("fe/login/login","message",null);
    }

    @PostMapping(value = "/sign-in")
    public String createUser(@ModelAttribute("user") User user, Model model){
        //Ma hoa password
        User userCheck = userService.findByEmail(user.getEmail());
        if(userCheck!=null){
            model.addAttribute("message", "Email này đã có người sử dụng");
            model.addAttribute("user",user);
            return "redirect:/";
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRole("SHOP_OWNER");
        user.setEnable(true);
        userService.save(user);
        return "fe/login/login";
    }

    @PostMapping("/fail-login")
    public  ModelAndView handleFailedLogin(){
        return new ModelAndView("/fe/login/login","message","404");
    }
}

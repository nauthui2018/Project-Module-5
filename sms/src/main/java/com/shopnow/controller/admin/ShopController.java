package com.shopnow.controller.admin;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.service.ShopService;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping(value = "admins/shops")
public class ShopController {
    @Autowired
    ShopService shopService;

    @Autowired
    UserService userService;

    @GetMapping
    public String index(){
        return "admin/shop/shop";
    }

    @GetMapping("/shop_detail/{id}")
    public ModelAndView viewDetail(@PathVariable("id") Long id){
        ModelAndView modelAndView = new ModelAndView("/admin/shop/shop_detail");
        Shop shop = shopService.findById(id);
        List<User> users= userService.findAllByShop(shop);
        modelAndView.addObject("shop", shop);
        modelAndView.addObject("users", users);
        return modelAndView;
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Boolean> deleteShop(@PathVariable("id") Long id){
        Shop shop = shopService.findById(id);
        return new ResponseEntity<>(shopService.delete(shop), HttpStatus.OK);
    }

}

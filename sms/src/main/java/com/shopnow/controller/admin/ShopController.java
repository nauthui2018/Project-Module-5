package com.shopnow.controller.admin;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Set;

@Controller
@RequestMapping(value = "admin/shops")
public class ShopController {
    @Autowired
    ShopService shopService;

    @GetMapping
    public String index(){
        return "admin/shop/shop";
    }

    @GetMapping("/shop_detail/{id}")
    public ModelAndView viewDetail(@PathVariable("id") Long id){
        ModelAndView modelAndView = new ModelAndView("/admin/shop/shop_detail");
        Shop shop = shopService.findById(id);
        modelAndView.addObject("shop", shop);
        Set<User> users=shop.getUsers();
        modelAndView.addObject("users", users);
        return modelAndView;
    }

}

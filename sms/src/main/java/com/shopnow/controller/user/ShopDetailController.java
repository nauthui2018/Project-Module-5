package com.shopnow.controller.user;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.service.ShopService;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/user/shops")
public class ShopDetailController {

    @Autowired
    ShopService shopService;

    @Autowired
    UserService userService;

    @GetMapping(value = "/{id}")
    public ModelAndView index(@PathVariable("id") Long id){
        Shop shop = shopService.findById(id);
        ModelAndView modelAndView = new ModelAndView("admin/shop/shopUserPage");
        modelAndView.addObject("shop",shop);
        return modelAndView;
    }

    @GetMapping(value = "/edit/{idShop}/{idUser}")
    public ModelAndView getPageEdit(@PathVariable("idShop") Long idShop, @PathVariable("idUser") Long idUser){
        Shop shop = shopService.findById(idShop);
        ModelAndView modelAndView = new ModelAndView("admin/shop/editShop");
        modelAndView.addObject("shop",shop);

        User user = userService.findById(idUser);
        if(user.getRole().equalsIgnoreCase("SHOP_OWNER"))
        return modelAndView;
        else return new ModelAndView("admin/shop/shopUserPage");
    }
}

package com.shopnow.controller.admin;

import com.shopnow.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/shops")
public class ShopController {
    @Autowired
    ShopService shopService;

    @GetMapping
    public String index(){
        return "admin/shop";
    }

    @GetMapping(value = "/update/{id}")
    public ModelAndView updateIndex(@PathVariable Long id){
        ModelAndView modelAndView=new ModelAndView("admin/update_shop");
        modelAndView.addObject("webInfo", shopService.findById(id));
        return modelAndView;
    }
}

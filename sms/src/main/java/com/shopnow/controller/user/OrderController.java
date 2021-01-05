package com.shopnow.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/orders")
public class OrderController {

    @GetMapping
    public String index(){
        return "admin/order";
    }
}

package com.shopnow.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/customers")
public class CustomerController {
    @GetMapping
    public String index(){
        return "admin/customer";
    }
}

package com.shopnow.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/user/pos")
public class PosController {
    @GetMapping
    public String index(){
        return "fe/user/pos";
    }
}

package com.shopnow.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "admins/lobs")
public class LineOfBusinessController {

    @GetMapping
    public String index(){
        return "admin/lob";
    }
}

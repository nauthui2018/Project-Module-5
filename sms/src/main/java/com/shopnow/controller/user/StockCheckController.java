package com.shopnow.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/stock_checks")
public class StockCheckController {

    @GetMapping
    public String index() {
        return "admin/stock_check";
    }
}

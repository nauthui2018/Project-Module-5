package com.shopnow.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/invoiceDetail")
public class InvoiceDetailController {
    @GetMapping
    public String index(){
        return "admin/invoiceDetail";
    }
}

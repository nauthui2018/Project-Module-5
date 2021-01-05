package com.shopnow.controller.user;

import com.shopnow.model.Customer;
import com.shopnow.model.Product;
import com.shopnow.service.CustomerService;
import com.shopnow.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping(value = "/user/pos")
public class PosController {
    @Autowired
    ProductService productService;

    @Autowired
    CustomerService customerService;

    @GetMapping
    public ModelAndView index(){
        List<Product> products=productService.findAll();
        List<Customer> customers=customerService.findAll();
        ModelAndView modelAndView= new ModelAndView("fe/user/pos", "products", products);
        modelAndView.addObject("customers",customers);
        return modelAndView;
    }
}

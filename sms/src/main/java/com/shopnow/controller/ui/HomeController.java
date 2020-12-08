package com.shopnow.controller.ui;

import com.shopnow.model.WebInfo;
import com.shopnow.service.WebInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/")
public class HomeController {
    @Autowired
    WebInfoService webInfoService;

    @GetMapping
    public ModelAndView index(){
        WebInfo webInfo=webInfoService.findById(1L);
        ModelAndView modelAndView = new ModelAndView("fe/ui/index","webInfo", webInfo);
        return modelAndView;
    }

}

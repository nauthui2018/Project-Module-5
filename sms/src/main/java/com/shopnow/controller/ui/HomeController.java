package com.shopnow.controller.ui;

import com.shopnow.model.admin.WebInfo;
import com.shopnow.service.InterfaceServiveAdmin.LineOfBusinessService;
import com.shopnow.service.InterfaceServiveAdmin.ProvinceService;
import com.shopnow.service.InterfaceServiveAdmin.WebInfoService;
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

    @Autowired
    ProvinceService provinceService;

    @Autowired
    LineOfBusinessService lineOfBusinessService;

    @GetMapping
    public ModelAndView index(){
        WebInfo webInfo=webInfoService.findById(1L);
        ModelAndView modelAndView = new ModelAndView("fe/ui/index","webInfo", webInfo);
        modelAndView.addObject("provinces", provinceService.findAll());
        modelAndView.addObject("lineOfBusinesses", lineOfBusinessService.findAll());
        return modelAndView;
    }

}

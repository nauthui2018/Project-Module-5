package com.shopnow.controller.admin;

import com.shopnow.service.WebInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = {"admins","admins/webInfos"})
public class WebInfoController {
    @Autowired
    WebInfoService webInfoService;

    @GetMapping
    public String index(){
        return "admin/webInfo/web_info";
    }

    @GetMapping(value = "/update/{id}")
    public ModelAndView updateIndex(@PathVariable Long id){
        ModelAndView modelAndView=new ModelAndView("admin/webInfo/update_web_info");
        modelAndView.addObject("webInfo", webInfoService.findById(id));
        return modelAndView;
    }
}

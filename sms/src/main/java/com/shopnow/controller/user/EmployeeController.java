package com.shopnow.controller.user;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.service.ShopService;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/user/employees")
public class EmployeeController {
    @Autowired
    ShopService shopService;

    @Autowired
    UserService userService;

    @GetMapping(value = "/{shopId}/{userId}")
    public ModelAndView index(@PathVariable("shopId") Long shopID,@PathVariable("userId") Long userId){
        ModelAndView modelAndView=new ModelAndView("admin/employee/employee");
        modelAndView.addObject("shopID",shopID);

        User user = userService.findById(userId);
        modelAndView.addObject("userObj",user);
        return modelAndView;
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") Long id){
        return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
    }

    @GetMapping(value ="/employeeDetail/{idUser}" )
    public ModelAndView employeeDetail(@PathVariable("idUser") Long idUser){
        ModelAndView modelAndView=new ModelAndView("admin/employee/employeeDetail");
        User user = userService.findById(idUser);
        modelAndView.addObject("user",user);
        return modelAndView;
    }

}

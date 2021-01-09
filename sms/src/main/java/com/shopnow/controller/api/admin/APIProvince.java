package com.shopnow.controller.api.admin;

import com.shopnow.model.Province;
import com.shopnow.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/province")
public class APIProvince {
    @Autowired
    ProvinceService provinceService;

    @GetMapping
    public ResponseEntity<List<Province>> listProvince() {
        List<Province> provinces = provinceService.findAll();
        return new ResponseEntity<>(provinces, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Province> saveProvince(@RequestBody Province province) {
        provinceService.save(province);
        return new ResponseEntity<>(province, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Province> getProvince(@PathVariable("id") Long id){
        Province province= provinceService.findById(id);
        if(province!=null)
        return new ResponseEntity<>(province,HttpStatus.OK);
        return new ResponseEntity<>(province,HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Province> updateProvince(@RequestBody Province province){
        provinceService.save(province);
        return new ResponseEntity<>(province, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteProvince(@PathVariable("id") Long id){
        return new ResponseEntity<>(provinceService.deleteById(id), HttpStatus.OK);
    }
}

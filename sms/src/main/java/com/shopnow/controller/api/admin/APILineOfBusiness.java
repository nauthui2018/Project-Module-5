package com.shopnow.controller.api.admin;

import com.shopnow.model.LineOfBusiness;
import com.shopnow.service.LineOfBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/lob")
public class APILineOfBusiness {
    @Autowired
    LineOfBusinessService lineOfBusinessService;

    @GetMapping
    public ResponseEntity<List<LineOfBusiness>> listLineOfBusiness() {
        List<LineOfBusiness> lineOfBusinesses = lineOfBusinessService.findAll();
        return new ResponseEntity<>(lineOfBusinesses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LineOfBusiness> saveLineOfBusiness(@RequestBody LineOfBusiness lineOfBusiness) {
        lineOfBusinessService.save(lineOfBusiness);
        return new ResponseEntity<>(lineOfBusiness, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<LineOfBusiness> getLineOfBusiness(@PathVariable("id") Long id){
        LineOfBusiness lineOfBusiness= lineOfBusinessService.findById(id);
        if(lineOfBusiness!=null)
            return new ResponseEntity<>(lineOfBusiness,HttpStatus.OK);
        return new ResponseEntity<>(lineOfBusiness,HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<LineOfBusiness> updateLineOfBusiness(@RequestBody LineOfBusiness lineOfBusiness){
        lineOfBusinessService.save(lineOfBusiness);
        return new ResponseEntity<>(lineOfBusiness, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteLineOfBusiness(@PathVariable("id") Long id){
        return new ResponseEntity<>(lineOfBusinessService.deleteById(id), HttpStatus.OK);
    }
}

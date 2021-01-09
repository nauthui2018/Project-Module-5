package com.shopnow.controller.api.admin;

import com.shopnow.model.WebInfo;
import com.shopnow.service.UploadFile.FileUploadService;
import com.shopnow.service.WebInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/webInfo")
public class APIWebInfo {
    @Autowired
    WebInfoService webInfoService;

    @GetMapping
    public ResponseEntity<List<WebInfo>> listWebInfo() {
        List<WebInfo> webInfos = webInfoService.findAll();
        return new ResponseEntity<>(webInfos, HttpStatus.OK);
    }

    @PostMapping(value = "/background1")
    public ResponseEntity<String> uploadBackground1(@RequestParam("file") MultipartFile file, @RequestParam Long id ) throws IllegalStateException, IOException {
        WebInfo webInfo= webInfoService.findById(id);
        webInfo.setBackground1(FileUploadService.uploadBackground1(file));
        webInfoService.save(webInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/background2")
    public ResponseEntity<String> uploadBackground2(@RequestParam("file") MultipartFile file, @RequestParam Long id ) throws IllegalStateException, IOException {
        WebInfo webInfo= webInfoService.findById(id);
        webInfo.setBackground2(FileUploadService.uploadBackground2(file));
        webInfoService.save(webInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/background3")
    public ResponseEntity<String> uploadBackground3(@RequestParam("file") MultipartFile file, @RequestParam Long id ) throws IllegalStateException, IOException {
        WebInfo webInfo= webInfoService.findById(id);
        webInfo.setBackground3(FileUploadService.uploadBackground3(file));
        webInfoService.save(webInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/logo1")
    public ResponseEntity<String> uploadLogo1(@RequestParam("file") MultipartFile file, @RequestParam  Long id ) throws IllegalStateException, IOException {
        WebInfo webInfo=webInfoService.findById(id);
        webInfo.setLogo1(FileUploadService.uploadLogo1(file));
        webInfoService.save(webInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/logo2")
    public ResponseEntity<String> uploadLogo2(@RequestParam("file") MultipartFile file, @RequestParam Long id ) throws IllegalStateException, IOException {
        WebInfo webInfo= webInfoService.findById(id);
        webInfo.setLogo2(FileUploadService.uploadLogo2(file));
        webInfoService.save(webInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WebInfo> saveWebInfo(@RequestBody WebInfo webInfo) {
        webInfoService.save(webInfo);
        return new ResponseEntity<>(webInfo, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<WebInfo> getWebInfo(@PathVariable("id") Long id){
        WebInfo webInfo= webInfoService.findById(id);
        if(webInfo!=null)
            return new ResponseEntity<>(webInfo,HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<WebInfo> updateWebInfo(@RequestBody WebInfo webInfo){

        webInfoService.save(webInfo);
        return new ResponseEntity<>(webInfo, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteWebInfo(@PathVariable("id") Long id){
        return new ResponseEntity<>(webInfoService.deleteById(id), HttpStatus.OK);
    }
}

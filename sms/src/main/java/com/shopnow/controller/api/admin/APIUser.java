package com.shopnow.controller.api.admin;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import com.shopnow.model.WebInfo;
import com.shopnow.service.ShopService;
import com.shopnow.service.UploadFile.FileUploadService;
import com.shopnow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/admin/user")
public class APIUser {
    @Autowired
    UserService userService;
    @Autowired
    ShopService shopService;

    @GetMapping
    public ResponseEntity<List<User>> listUser() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> saveUserByShop(@RequestBody User user) {
        User userCheck = userService.findByEmail(user.getEmail());
        if (userCheck != null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (user.getPassword() == null) {
            user.setPassword("Pa$$w0rd!");
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        User user = userService.findById(id);
        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        return new ResponseEntity<>(user, HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        if(user.getProvince().getId()==0){
            user.setProvince(null);
        }
        User dbUser = userService.findById(user.getId());
        user.setEmail(dbUser.getEmail());
        user.setPassword(dbUser.getPassword());
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/find/{email}")
    public ResponseEntity<User> findUserByEmail(@PathVariable("email") String email) {
        User user = userService.findByEmail(email);
        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/listUser/{shopId}")
    public ResponseEntity<List<User>> findUsersByShop(@PathVariable("shopId") Long shopId) {
        Shop shop = shopService.findById(shopId);
        List<User> users = userService.findAllByShop(shop);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping(value = "/checkpass")
    public ResponseEntity<User> checkPass(@RequestBody User userOld) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User userDatabase = userService.findById(userOld.getId());
        String dbPassword = userDatabase.getPassword();
        String existingPassword = userOld.getPassword();
        if (passwordEncoder.matches(existingPassword, dbPassword)) {
            return new ResponseEntity<>(userOld, HttpStatus.OK);
        } else return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/changePass")
    public ResponseEntity<User> changePass(@RequestBody User userOld) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User userDatabase = userService.findById(userOld.getId());
        userDatabase.setPassword(passwordEncoder.encode(userOld.getPassword()));
        userService.save(userDatabase);
        return new ResponseEntity<>(userDatabase, HttpStatus.OK);
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<String> uploadLogo1(@RequestParam("file") MultipartFile file, @RequestParam  Long id ) throws IllegalStateException, IOException {
        User user=userService.findById(id);
        String src="./src/main/resources/static/admin/build/images/avatar";
        user.setUser_avatar("/admin/build/images/avatar/"+FileUploadService.uploadFile(file,src));
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

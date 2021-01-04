package com.shopnow.repository;

import com.shopnow.model.Shop;
import com.shopnow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findAllByShop(Shop shop);
}

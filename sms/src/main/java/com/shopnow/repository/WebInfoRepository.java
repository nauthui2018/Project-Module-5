package com.shopnow.repository;

import com.shopnow.model.WebInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface WebInfoRepository extends JpaRepository<WebInfo,Long> {
}

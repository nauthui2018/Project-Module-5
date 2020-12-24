package com.shopnow.repository.admin;

import com.shopnow.model.admin.WebInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface WebInfoRepository extends JpaRepository<WebInfo,Long> {
}

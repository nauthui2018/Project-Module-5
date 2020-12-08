package com.shopnow.repository;

import com.shopnow.model.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProvinceRepository extends JpaRepository<Province,Long> {
}

package com.shopnow.repository.admin;

import com.shopnow.model.admin.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProvinceRepository extends JpaRepository<Province,Long> {
}

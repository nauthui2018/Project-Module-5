package com.shopnow.service.impl;

import com.shopnow.model.Province;
import com.shopnow.repository.ProvinceRepository;
import com.shopnow.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceServiceImpl implements ProvinceService {
    @Autowired
    ProvinceRepository provinceRepository;

    @Override
    public List<Province> findAll() {
        return provinceRepository.findAll();
    }

    @Override
    public Province save(Province object) {
        return provinceRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        Province province=findById(id);
        if(province!=null){
            province.setDeleted(true);
            provinceRepository.save(province);
            return true;
        }
        return false;
    }

    @Override
    public Province findById(Long id) {
        return provinceRepository.findById(id).orElse(null);
    }
}

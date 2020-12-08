package com.shopnow.service.impl;

import com.shopnow.model.LineOfBusiness;
import com.shopnow.repository.LineOfBusinessRepository;
import com.shopnow.service.LineOfBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LineOfBusinessServiceImpl implements LineOfBusinessService {

    @Autowired
    LineOfBusinessRepository lineOfBusinessRepository;
    @Override
    public List<LineOfBusiness> findAll() {
        return lineOfBusinessRepository.findAll();
    }

    @Override
    public LineOfBusiness save(LineOfBusiness object) {
        return lineOfBusinessRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        LineOfBusiness lineOfBusiness=findById(id);
        if(lineOfBusiness!=null){
            lineOfBusiness.setDeleted(true);
            lineOfBusinessRepository.save(lineOfBusiness);
            return true;
        }
        return false;
    }

    @Override
    public LineOfBusiness findById(Long id) {
        return lineOfBusinessRepository.findById(id).orElse(null);
    }
}

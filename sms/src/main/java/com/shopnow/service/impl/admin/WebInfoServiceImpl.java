package com.shopnow.service.impl.admin;

import com.shopnow.model.admin.WebInfo;
import com.shopnow.repository.admin.WebInfoRepository;
import com.shopnow.service.InterfaceServiveAdmin.WebInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebInfoServiceImpl implements WebInfoService {
    @Autowired
    private WebInfoRepository webInfoRepository;

    @Override
    public List<WebInfo> findAll() {
        return webInfoRepository.findAll();
    }

    @Override
    public WebInfo save(WebInfo object) {
        return webInfoRepository.save(object);
    }

    @Override
    public boolean deleteById(Long id) {
        WebInfo webInfo = findById(id);
        if (webInfo != null) {
            webInfo.setDeleted(true);
            webInfoRepository.save(webInfo);
            return true;
        }
        return false;
    }

    @Override
    public WebInfo findById(Long id) {
        return webInfoRepository.findById(id).orElse(null);
    }
}

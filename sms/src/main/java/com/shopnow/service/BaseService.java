package com.shopnow.service;

import java.util.List;

public interface BaseService<T> {
    List<T> findAll();
    T save(T object);
    boolean deleteById(Long id);
    T findById(Long id);
}

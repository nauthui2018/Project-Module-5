package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "warehouses")
@Data
@Where(clause = "deleted=false")
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private boolean deleted = false;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnore
    private Set<Product> products;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnore
    private Set<StockCheck> stock_checks;
}

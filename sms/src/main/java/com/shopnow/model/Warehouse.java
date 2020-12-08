package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "warehouses")
@Data
@Where(clause = "deleted=false")
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int product_quantity;
    private int coming_quantity;
    private int delivered_quantity;
    private int scrap_quantity;
    private boolean deleted = false;
    private LocalDate stock_check;

    @OneToMany(targetEntity = Product.class)
    @JsonIgnore
    private Set<Product> products;
}
